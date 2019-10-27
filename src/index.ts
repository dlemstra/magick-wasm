import MagickNative from './wasm/magick.js';
import { ImageMagick } from './image-magick';

let loader: Promise<void>;
let api: ImageMagick;

export async function imageMagick(): Promise<ImageMagick> {
    if (api !== undefined)
        return api;

    if (loader === undefined) {
        loader = new Promise(resolve => {
            MagickNative().then((native) => {
                api = new ImageMagick(native);
                resolve();
            });
        });
    }

    await loader;
    return api;
}