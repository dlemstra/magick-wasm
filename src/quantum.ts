import { MagickNative } from "../lib/wasm/magick";

export class Quantum
{
    private constructor(private im: MagickNative) {}

    /** @internal */
    static create = (im: MagickNative): Quantum => new Quantum(im);

    get depth(): number { return this.im._Quantum_Depth_Get(); }
}