import { ImageMagick } from "../image-magick";
import { Exception } from "../exception/exception";
import { withString } from "../util/string";
import { NativeInstance } from "../native-instance";
import { MagickImage } from "../magick-image";
import { quantumArray } from "../wasm/magick";

export class PixelCollection extends NativeInstance {
    private readonly image: MagickImage;

    private constructor(image: MagickImage) {
        const instance = Exception.usePointer((exception) => {
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
    static _use<TReturnType>(image: MagickImage, func: (pixels: PixelCollection) => TReturnType): TReturnType {
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
            pixels.use(0, 0, image.width, image.height, mapping, (instance) => {
                func(instance);
            });
        }
        finally {
            pixels.dispose();
        }
    }

    getArea(x: number, y: number, width: number, height: number): quantumArray {
        return Exception.usePointer((exception) => {
            const instance = ImageMagick._api._PixelCollection_GetArea(this._instance, x, y, width, height, exception);
            const count = width * height * this.image.channelCount;
            return ImageMagick._api.HEAPU8.subarray(instance, instance + count);
        });
    }

    toByteArray(x: number, y: number, width: number, height: number, mapping: string): Uint8Array | null {
        return this.use(x, y, width, height, mapping, (instance) => {
            return PixelCollection.createArray(instance, width, height, mapping.length);
        });
    }

    private static createArray(instance: number, width: number, height: number, channelCount: number): Uint8Array | null {
        if (instance === 0)
            return null;

        try {
            const count = width * height * channelCount;
            return ImageMagick._api.HEAPU8.subarray(instance, instance + count);
        }
        finally {
            ImageMagick._api._MagickMemory_Relinquish(instance);
        }
    }

    private use<TReturnType>(x: number, y: number, width: number, height: number, mapping: string, func: (instance: number) => TReturnType): TReturnType | null {
        return withString(mapping, (mappingPtr) => {
            return Exception.use((exception) => {
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