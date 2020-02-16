import { ImageMagick } from "../image-magick";
import { withString } from "../util/string";
import { NativeInstance } from "../native-instance";

/** @internal */
export class NativeMagickSettings extends NativeInstance {
    constructor(settings: MagickSettings) {
        const instance = ImageMagick._api._MagickSettings_Create();
        const disposeMethod = ImageMagick._api._MagickSettings_Dispose;
        super(instance, disposeMethod);

        if (settings._fileName !== undefined) {
            withString(settings._fileName, (filenamePtr) => {
                ImageMagick._api._MagickSettings_SetFileName(this._instance, filenamePtr);
            });
        }
    }
}

export class MagickSettings {
    /** @internal */
    _fileName?: string;

    /** @internal */
    _use<TReturnType>(func: (settings: NativeMagickSettings) => TReturnType): TReturnType {
        const settings = new NativeMagickSettings(this);
        try {
            return func(settings);
        } finally {
            settings.dispose();
        }
    }
}