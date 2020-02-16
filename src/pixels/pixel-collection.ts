import { ImageMagick } from "../image-magick";
import { Exception } from "../exception/exception";
import { withString } from "../util/string";
import { NativeInstance } from "../native-instance";
import { MagickImage } from "../magick-image";

export class PixelCollection extends NativeInstance {
    private constructor(image: number) {
        const instance = Exception.usePointer((exception) => {
            return ImageMagick._api._PixelCollection_Create(image, exception);
        });
        const disposeMethod = ImageMagick._api._PixelCollection_Dispose;

        super(instance, disposeMethod);
    }

    /** @internal */
    static _create(image: MagickImage): PixelCollection {
        return new PixelCollection(image._instance);
    }

    /** @internal */
    static _use<TReturnType>(image: MagickImage, func: (pixels: PixelCollection) => TReturnType): TReturnType {
        const pixels = new PixelCollection(image._instance);
        try {
            return func(pixels);
        } finally {
            pixels.dispose();
        }
    }

    /** @internal */
    static _map(image: MagickImage, mapping: string, func: (instance: number) => void): void {
        const pixels = new PixelCollection(image._instance);
        try {
            pixels.use(0, 0, image.width, image.height, mapping, (instance) => {
                func(instance);
            });
        }
        finally {
            pixels.dispose();
        }
    }

    toByteArray(x: number, y: number, width: number, height: number, mapping: string): Uint8Array | null {
        return this.use(x, y, width, height, mapping, (instance) => {
            return PixelCollection.createArray(instance, width, height, mapping.length);
        });
    }

    static createArray(instance: number, width: number, height: number, channelCount: number): Uint8Array | null {
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