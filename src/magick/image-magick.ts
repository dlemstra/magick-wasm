import { MagickNative } from '../wasm/magick.js';
import { Quantum } from "./quantum";
import { Magick } from './magick.js';

export class ImageMagick {

    readonly quantum: Quantum;
    readonly magick: Magick;

    /** @internal */
    constructor(im : MagickNative)
    {
        this.quantum = Quantum.create(im);
        this.magick = Magick.create(im);
    }
}