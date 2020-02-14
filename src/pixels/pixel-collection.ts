import { ImageMagick } from "../image-magick";
import { Exception } from "../exception/exception";
import { withString } from "../util/string";
import { NativeInstance } from "../native-instance";
import { MagickImage } from "../magick-image";

export class PixelCollection extends NativeInstance {
    /** @internal */
    constructor(image: number) {
        const instance = Exception.usePointer((exception) => {
            return ImageMagick.api._PixelCollection_Create(image, exception);
        });
        const disposeMethod = ImageMagick.api._PixelCollection_Dispose;

        super(instance, disposeMethod);
    }

    /** @internal */
    static use<TReturnType>(image: MagickImage, func: (pixels: PixelCollection) => TReturnType): TReturnType {
        const pixels = new PixelCollection(image.instance);
        try {
            return func(pixels);
        } finally {
            pixels.dispose();
        }
    }

    toByteArray(x: number, y: number, width: number, height: number, mapping: string): number {
        return withString(mapping, (mappingPtr) => {
            return Exception.usePointer((exception) => {
                return ImageMagick.api._PixelCollection_ToByteArray(this.instance, x, y, width, height, mappingPtr, exception);
            });
        });
    }
}