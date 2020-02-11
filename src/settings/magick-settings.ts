import { ImageMagick } from "../image-magick";
import { withString } from "../util/string";
import { NativeInstance } from "../native-instance";

export class MagickSettings extends NativeInstance
{
    private constructor() {
        const instance = ImageMagick.api._MagickSettings_Create();
        const disposeMethod = ImageMagick.api._MagickSettings_Dispose;
        super(instance, disposeMethod);
    }

    /** @internal */
    static use<TReturnType>(func: (settings: MagickSettings) => TReturnType): TReturnType {
        const settings = new MagickSettings();
        try {
            return func(settings);
        } finally {
            settings.dispose();
        }
    }

    /** @internal */
    setFileName(value: string): void {
        withString(value, (valuePtr) => {
            ImageMagick.api._MagickSettings_SetFileName(this.instance, valuePtr);
        });
    }
}