import { nativeApi } from "../image-magick";

/** @internal */
export class Pointer
{
    private readonly instance: number;

    private constructor() {
        this.instance = nativeApi()._malloc(8);
        nativeApi().setValue(this.instance, 0, "i64");
    }

    get ptr(): number { return this.instance; }

    get value(): number { return nativeApi().getValue(this.instance, "i64"); }

    static create<TReturnType>(func: (ptr: Pointer) => TReturnType): TReturnType {
        const ptr = new Pointer();
        try {
            return func(ptr);
        } finally {
            nativeApi()._free(ptr.instance);
        }
    }
}