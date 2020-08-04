/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from "./image-magick";
import { withString } from "./util/string";

export class MagickColor {
    private red = 0;
    private green = 0;
    private blue = 0;
    private alpha = 0;
    private black = 0;
    private _isCmyk = false;

    constructor(color?: string) {
        if (color === undefined)
            return;

        let instance = 0;
        try {
            instance = ImageMagick._api._MagickColor_Create();
            withString(color, (colorPtr) => {
                if (ImageMagick._api._MagickColor_Initialize(instance, colorPtr) === 0)
                    throw new Error("invalid color specified");
                this.initialize(instance);
            });
        } finally {
            ImageMagick._api._free(instance);
        }
    }

    /** @internal */
    static create(colorPtr: number): MagickColor {
        const color = new MagickColor();
        color.initialize(colorPtr);

        return color;
    }

    get r(): number { return this.red }
    set r(value: number) { this.red = value; }

    get g(): number { return this.green }
    set g(value: number) { this.green = value; }

    get b(): number { return this.blue }
    set b(value: number) { this.blue = value; }

    get a(): number { return this.alpha }
    set a(value: number) { this.alpha = value; }

    get k(): number { return this.black }
    set k(value: number) { this.black = value; }

    get isCmyk() : boolean { return this._isCmyk }

    /** @internal */
    use(func: (colorPtr: number) => void): void {
    let instance = 0;
        try {
            instance = ImageMagick._api._MagickColor_Create();
            ImageMagick._api._MagickColor_Red_Set(instance, this.red);
            ImageMagick._api._MagickColor_Green_Set(instance, this.green);
            ImageMagick._api._MagickColor_Blue_Set(instance, this.blue);
            ImageMagick._api._MagickColor_Alpha_Set(instance, this.alpha);
            ImageMagick._api._MagickColor_IsCMYK_Set(instance, this._isCmyk ? 1 : 0);
            func(instance);
        } finally {
            ImageMagick._api._free(instance);
        }
    }

    private initialize(instance: number) {
        this.red = ImageMagick._api._MagickColor_Red_Get(instance);
        this.green = ImageMagick._api._MagickColor_Green_Get(instance);
        this.blue = ImageMagick._api._MagickColor_Blue_Get(instance);
        this.alpha = ImageMagick._api._MagickColor_Alpha_Get(instance);
        this._isCmyk = ImageMagick._api._MagickColor_IsCMYK_Get(instance) === 1;
    }
}