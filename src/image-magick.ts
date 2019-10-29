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
    constructor(private im: MagickNative) {
        withString(im, 'MAGICK_CONFIGURE_PATH', name => {
            withString(im, '/xml', value => {
                im._Environment_SetEnv(name, value);
            });
        })

        this.quantum = Quantum.create(im);
        this.magick = Magick.create(im);
    }

    async read(fileName: string, func: (image: MagickImage) => Promise<void>): Promise<void> {
        await MagickImage.create(this.im, async (image) => {
            image.read(fileName);
            await func(image);
        });
    }
}
