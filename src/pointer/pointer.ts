import { MagickNative } from "../../lib/wasm/magick";

/** @internal */
export class Pointer
{
    private readonly instance: number;

    private constructor(private im: MagickNative) {
        this.instance = im._malloc(8);
        im.setValue(this.instance, 0, "i64");
    }

    get ptr() { return this.instance; }

    get value() { return this.im.getValue(this.instance, "i64"); }

    static create<TReturnType>(im: MagickNative, func: (ptr: Pointer) => TReturnType): TReturnType {
        const ptr = new Pointer(im);
        try {
            return func(ptr);
        } finally {
            im._free(ptr.instance);
        }
    }
}