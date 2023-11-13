// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Disposable } from '../internal/disposable';
import { Exception } from '../internal/exception/exception';
import { IDisposable } from '../disposable';
import { ImageMagick } from '../image-magick';
import { IMagickImage } from '../magick-image';
import { NativeInstance } from '../native-instance';
import { quantumArray } from '@dlemstra/magick-native/magick';
import { _withQuantumArray } from '../internal/native/array';
import { _withString } from '../internal/native/string';

/**
 * Interface that can be used to access the individual pixels of an image.
 */
export interface IPixelCollection extends IDisposable {
    /**
     * Returns the pixels at the specified area.
     * @param x - The X coordinate.
     * @param y - The Y coordinate.
     * @param width - The width of the area.
     * @param height - The height of the area.
     * @returns - The quantum array of the area.
     */
    getArea(x: number, y: number, width: number, height: number): quantumArray;

    /**
     * Returns the pixel at the specified coordinate.
     * @param x - The X coordinate of the pixel.
     * @param y - The Y coordinate of the pixel.
     * @returns - The quantum array of the pixel.
     */
    getPixel(x: number, y: number): quantumArray;

    /**
     * Changes the values of the specified pixels.
     * @param x - The X coordinate of the area.
     * @param y - The Y coordinate of the area.
     * @param width - The width of the area.
     * @param height - The height of the area.
     * @param quantumPixels - The values of the pixels.
     */
    setArea(x: number, y: number, width: number, height: number, quantumPixels: quantumArray): void;

    /**
     * Changes the values of the specified pixels.
     * @param x - The X coordinate of the area.
     * @param y - The Y coordinate of the area.
     * @param width - The width of the area.
     * @param height - The height of the area.
     * @param numberPixels - The values of the pixels.
     */
    setArea(x: number, y: number, width: number, height: number, numberPixels: number[]): void;

    /**
     *Changes the value of the specified pixel.
     * @param x - The X coordinate of the pixel.
     * @param y - The Y coordinate of the pixel.
     * @param quantumPixels - The values of the pixel.
     */
    setPixel(x: number, y: number, quantumPixels: quantumArray): void;

    /**
     *Changes the value of the specified pixel.
     * @param x - The X coordinate of the pixel.
     * @param y - The Y coordinate of the pixel.
     * @param numberPixels - The values of the pixel.
     */
    setPixel(x: number, y: number, numberPixels: number[]): void;

    /**
     * Returns the values of the pixels as a byte array.
     * @param x - The X coordinate of the area.
     * @param y - The Y coordinate of the area.
     * @param width - The width of the area.
     * @param height - The height of the area.
     * @param mapping - The mapping of the pixels.
     */
    toByteArray(x: number, y: number, width: number, height: number, mapping: string): Uint8Array | null;
}

export class PixelCollection extends NativeInstance implements IPixelCollection {
    private readonly image: IMagickImage;

    private constructor(image: IMagickImage) {
        const instance = Exception.usePointer(exception => {
            return ImageMagick._api._PixelCollection_Create(image._instance, exception);
        });
        const disposeMethod = ImageMagick._api._PixelCollection_Dispose;

        super(instance, disposeMethod);

        this.image = image;
    }

    /** @internal */
    static _create(image: IMagickImage): PixelCollection {
        return new PixelCollection(image);
    }

    /** @internal */
    static _use<TReturnType>(image: IMagickImage, func: (pixels: IPixelCollection) => TReturnType): TReturnType;
    /** @internal */
    static _use<TReturnType>(image: IMagickImage, func: (pixels: IPixelCollection) => Promise<TReturnType>): Promise<TReturnType>;
    static _use<TReturnType>(image: IMagickImage, func: (pixels: IPixelCollection) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        const pixels = new PixelCollection(image);
        return Disposable._disposeAfterExecution(pixels, func);
    }

    /** @internal */
    static _map(image: IMagickImage, mapping: string, func: (instance: number) => void): void {
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
            _withQuantumArray(pixels, pixelsPtr => {
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

    toByteArray(x: number, y: number, width: number, height: number, mapping: string): Uint8Array | null {
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
            instance = ImageMagick._api._MagickMemory_Relinquish(instance);
        }
    }

    private use<TReturnType>(x: number, y: number, width: number, height: number, mapping: string, func: (instance: number) => TReturnType): TReturnType | null {
        return _withString(mapping, mappingPtr => {
            return Exception.use(exception => {
                let instance = ImageMagick._api._PixelCollection_ToByteArray(this._instance, x, y, width, height, mappingPtr, exception.ptr);

                return exception.check(() => {
                    const result = func(instance);
                    instance = ImageMagick._api._MagickMemory_Relinquish(instance);
                    return result;
                }, () => {
                    instance = ImageMagick._api._MagickMemory_Relinquish(instance);
                    return null;
                });
            });
        });
    }
}
