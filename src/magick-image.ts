import { MagickNative } from "../lib/wasm/magick";
import { ColorSpace } from "./color-space";
import { Exception } from "./exception/exception";
import { MagickSettings } from "./settings/magick-settings";
import { withString } from "./util/string";

export class MagickImage 
{
    private instance : number = 0;

    private constructor(private im : MagickNative) { }

    /** @internal */
    static create<TReturnType>(im: MagickNative, func: (settings: MagickImage) => TReturnType): TReturnType {
        const image = new MagickImage(im);
        try {
            return func(image);
        } finally {
            image.dispose();
        }
    }

    get colorSpace() {
        return Exception.create(this.im, (exception) => {
            return this.im._MagickImage_ColorSpace_Get(this.instance, exception);
        });
    }

    get depth(): ColorSpace { return this.im._MagickImage_Depth_Get(this.instance); }
    set depth(value) { this.im._MagickImage_Depth_Set(this.instance, value); }

    get format() { return this.im.UTF8ToString(this.im._MagickImage_Format_Get(this.instance)); }
    set format(value) { withString(this.im, value, (instance) => this.im._MagickImage_Format_Set(this.instance, instance)); }

    get height() { return this.im._MagickImage_Height_Get(this.instance); }

    get width() { return this.im._MagickImage_Width_Get(this.instance); }

    read(fileName: string) {
        Exception.create(this.im, (exception) => {
            MagickSettings.create(this.im, (settings) => {
                settings.setFileName(fileName);
                this.instance = this.im._MagickImage_ReadFile(settings.getPointer(), exception);
            });
        });
    }

    dispose() {
        if (this.instance !== 0) {
            this.im._MagickImage_Dispose(this.instance);
            this.instance = 0;
        }
    }

    toString = () => `${this.format} ${this.width}x${this.height} ${this.depth}-bit ${ColorSpace[this.colorSpace]}`
}