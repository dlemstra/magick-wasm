import { MagickNative } from "../../lib/wasm/magick";
import { withString } from "../util/string";

export class MagickSettings
{
    private instance: number;

    private constructor(private im : MagickNative) {
        this.instance = im._MagickSettings_Create();
    }

    /** @internal */
    getPointer = () => this.instance;

    /** @internal */
    static create<TReturnType>(im: MagickNative, func: (settings: MagickSettings) => TReturnType): TReturnType {
        const settings = new MagickSettings(im);
        try {
            return func(settings);
        } finally {
            settings.dispose();
        }
    }

    /** @internal */
    setFileName(value: string) {
        withString(this.im, value, (instance) => {
            this.im._MagickSettings_SetFileName(this.instance, instance);
        });
    }

    dispose() {
        if (this.instance !== 0) {
            this.im._MagickSettings_Dispose(this.instance);
            this.instance = 0;
        }
    }
}