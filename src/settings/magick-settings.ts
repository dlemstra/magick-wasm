import { nativeApi } from "../image-magick";
import { withString } from "../util/string";

export class MagickSettings
{
    private instance: number;

    private constructor() {
        this.instance = nativeApi()._MagickSettings_Create();
    }

    /** @internal */
    getPointer = (): number => this.instance;

    /** @internal */
    static create<TReturnType>(func: (settings: MagickSettings) => TReturnType): TReturnType {
        const settings = new MagickSettings();
        try {
            return func(settings);
        } finally {
            settings.dispose();
        }
    }

    /** @internal */
    setFileName(value: string): void {
        withString(value, (instance) => {
            nativeApi()._MagickSettings_SetFileName(this.instance, instance);
        });
    }

    dispose(): void {
        if (this.instance !== 0) {
            nativeApi()._MagickSettings_Dispose(this.instance);
            this.instance = 0;
        }
    }
}