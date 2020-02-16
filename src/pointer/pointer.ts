import { ImageMagick } from "../image-magick";

/** @internal */
export class Pointer {
    private readonly instance: number;

    private constructor() {
        this.instance = ImageMagick._api._malloc(8);
        ImageMagick._api.setValue(this.instance, 0, "i64");
    }

    get ptr(): number { return this.instance; }

    get value(): number { return ImageMagick._api.getValue(this.instance, "i64"); }

    static use<TReturnType>(func: (ptr: Pointer) => TReturnType): TReturnType {
        const ptr = new Pointer();
        try {
            return func(ptr);
        } finally {
            ImageMagick._api._free(ptr.instance);
        }
    }
}