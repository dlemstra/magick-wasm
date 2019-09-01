import { MagickNative } from "../wasm/magick";

export class Quantum
{
    constructor(private im : MagickNative) { }

    get depth()
    {
        return this.im._Quantum_Depth_Get();
    } 
}