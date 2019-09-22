import { MagickNative } from '../../lib/wasm/magick.js';
import { Quantum } from "./quantum";
import { Magick } from './magick.js';
import { MagickImage } from './magick-image.js';

export class ImageMagick {

    readonly quantum: Quantum;
    readonly magick: Magick;

    /** @internal */
    constructor(private im : MagickNative) {
        this.quantum = Quantum.create(im);
        this.magick = Magick.create(im);
    }

    read(fileName: string, func: (image: MagickImage) => void) {
        MagickImage.create(this.im, (image) =>  {
            image.read(fileName);
            func(image);
        });
    }
}