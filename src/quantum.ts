import { ImageMagick } from "./image-magick";

export class Quantum
{
    static get depth(): number { return ImageMagick.api._Quantum_Depth_Get(); }
}