// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../image-magick';
import { Exception } from '../internal/exception/exception';
import { NativeInstance } from '../internal/native-instance';
import { MagickImage } from '../magick-image';
import { quantumArray } from '../wasm/magick';
import { _withQuantumArray } from '../internal/native/array';
import { _withString } from '../internal/native/string';

export interface IPixelCollection {
    getArea(x: number, y: number, width: number, height: number): quantumArray;
    getPixel(x: number, y: number): quantumArray;
    setArea(x: number, y: number, width: number, height: number, quantumPixels: quantumArray): void;
    setArea(x: number, y: number, width: number, height: number, numberPixels: number[]): void;
    setPixel(x: number, y: number, quantumPixels: quantumArray): void;
    setPixel(x: number, y: number, numberPixels: number[]): void;
    toByteArray(x: number, y: number, width: number, height: number, mapping: string): quantumArray | null;
}

export class PixelCollection extends NativeInstance implements IPixelCollection {
    private readonly image: MagickImage;

    private constructor(image: MagickImage) {
        const instance = Exception.usePointer(exception => {
            return ImageMagick._api._PixelCollection_Create(image._instance, exception);
        });
        const disposeMethod = ImageMagick._api._PixelCollection_Dispose;

        super(instance, disposeMethod);

        this.image = image;
    }

    /** @internal */
    static _create(image: MagickImage): PixelCollection {
        return new PixelCollection(image);
    }

    /** @internal */
    static _use<TReturnType>(image: MagickImage, func: (pixels: IPixelCollection) => TReturnType): TReturnType {
        const pixels = new PixelCollection(image);
        try {
            return func(pixels);
        } finally {
            pixels.dispose();
        }
    }

    /** @internal */
    static _map(image: MagickImage, mapping: string, func: (instance: number) => void): void {
        const pixels = new PixelCollection(image);
        try {
            pixels.use(0, 0, image.width, image.height, mapping, instance => {
                func(instance);
            });
        }
        finally {
            pixels.dispose();
        }
    }

    getArea(x: number, y: number, width: number, height: number): quantumArray {
        return Exception.usePointer(exception => {
            const instance = ImageMagick._api._PixelCollection_GetArea(this._instance, x, y, width, height, exception);
            const count = width * height * this.image.channelCount;
            return ImageMagick._api.HEAPU8.subarray(instance, instance + count);
        });
    }

    getPixel(x: number, y: number): quantumArray {
        return this.getArea(x, y, 1, 1);
    }

    setArea(x: number, y: number, width: number, height: number, quantumPixels: quantumArray): void;
    setArea(x: number, y: number, width: number, height: number, numberPixels: number[]): void;
    setArea(x: number, y: number, width: number, height: number, quantumPixelsOrNumberPixels: quantumArray | number[]): void {
        Exception.usePointer(exception => {
            const pixels = (quantumPixelsOrNumberPixels instanceof Uint8Array) ? quantumPixelsOrNumberPixels : new Uint8Array(quantumPixelsOrNumberPixels);
            _withQuantumArray(pixels, pixelsPtr =>
            {
                ImageMagick._api._PixelCollection_SetArea(this._instance, x, y, width, height, pixelsPtr, pixels.length, exception);
            });
        });
    }

    setPixel(x: number, y: number, quantumPixels: quantumArray): void;
    setPixel(x: number, y: number, numberPixels: number[]): void;
    setPixel(x: number, y: number, quantumPixelsOrNumberPixels: quantumArray | number[]): void {
        if (quantumPixelsOrNumberPixels instanceof Uint8Array)
            this.setArea(x, y, 1, 1, quantumPixelsOrNumberPixels);
        else
            this.setArea(x, y, 1, 1, quantumPixelsOrNumberPixels);
    }

    toByteArray(x: number, y: number, width: number, height: number, mapping: string): quantumArray | null {
        return this.use(x, y, width, height, mapping, instance => {
            return PixelCollection.createArray(instance, width, height, mapping.length);
        });
    }

    private static createArray(instance: number, width: number, height: number, channelCount: number): quantumArray | null {
        if (instance === 0)
            return null;

        try {
            const count = width * height * channelCount;
            return ImageMagick._api.HEAPU8.slice(instance, instance + count);
        }
        finally {
            ImageMagick._api._MagickMemory_Relinquish(instance);
        }
    }

    private use<TReturnType>(x: number, y: number, width: number, height: number, mapping: string, func: (instance: number) => TReturnType): TReturnType | null {
        return _withString(mapping, mappingPtr => {
            return Exception.use(exception => {
                const instance = ImageMagick._api._PixelCollection_ToByteArray(this._instance, x, y, width, height, mappingPtr, exception.ptr);

                return exception.check(() => {
                    const result = func(instance);
                    ImageMagick._api._MagickMemory_Relinquish(instance);
                    return result;
                }, () => {
                    ImageMagick._api._MagickMemory_Relinquish(instance);
                    return null;
                });
            });
        });
    }
}