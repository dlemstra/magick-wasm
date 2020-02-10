import { nativeApi } from "./image-magick";

export class Quantum
{
    static get depth(): number { return nativeApi()._Quantum_Depth_Get(); }
}