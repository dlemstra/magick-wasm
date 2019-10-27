import { MagickNative } from '../lib/wasm/magick.js';
import { Quantum } from "./quantum";
import { Magick } from './magick';
import { MagickImage } from './magick-image';
import { withString } from './util/string';

export class ImageMagick
{
    readonly quantum: Quantum;
    readonly magick: Magick;

    /** @internal */
    constructor(private im : MagickNative) {
        withString(im, 'MAGICK_CONFIGURE_PATH', name => {
            withString(im, '/xml', value => {
                im._Environment_SetEnv(name, value);
            });
        })

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