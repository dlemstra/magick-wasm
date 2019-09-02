import { MagickNative } from "../wasm/magick";

export class Quantum
{
    private constructor(private im : MagickNative) { }

    /** @internal */
    static create = (im: MagickNative) => new Quantum(im);

    get depth()
    {
        return this.im._Quantum_Depth_Get();
    } 
}