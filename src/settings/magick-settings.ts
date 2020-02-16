import { ImageMagick } from "../image-magick";
import { withString } from "../util/string";
import { NativeInstance } from "../native-instance";

/** @internal */
export class NativeMagickSettings extends NativeInstance {
    constructor(settings: MagickSettings) {
        const instance = ImageMagick.api._MagickSettings_Create();
        const disposeMethod = ImageMagick.api._MagickSettings_Dispose;
        super(instance, disposeMethod);

        if (settings.fileName !== undefined) {
            withString(settings.fileName, (filenamePtr) => {
                ImageMagick.api._MagickSettings_SetFileName(this.instance, filenamePtr);
            });
        }
    }
}

export class MagickSettings {
    /** @internal */
    fileName?: string;

    /** @internal */
    use<TReturnType>(func: (settings: NativeMagickSettings) => TReturnType): TReturnType {
        const settings = new NativeMagickSettings(this);
        try {
            return func(settings);
        } finally {
            settings.dispose();
        }
    }
}