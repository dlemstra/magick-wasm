import { MagickNative } from '../wasm/magick.js';
import { Quantum } from "./quantum";
import { Magick } from './magick.js';

export class ImageMagick {

    readonly quantum: Quantum;
    readonly magick: Magick;

    constructor(im : MagickNative)
    {
        this.quantum = new Quantum(im);
        this.magick = new Magick(im);
    }
}