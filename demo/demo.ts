/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { initializeImageMagick, ImageMagick } from "../lib/image-magick";
import { Magick } from "../lib/magick";
import { MagickFormat } from "../lib/magick-format";
import { Quantum } from "../lib/quantum";

initializeImageMagick().then(async () => {
    console.log(Magick.imageMagickVersion);
    console.log('Delegates:', Magick.delegates);
    console.log('Features:', Magick.features);
    console.log('Quantum:', Quantum.depth);

    console.log('');
    ImageMagick.read('logo:', (image) => {
        image.resize(100, 100);
        image.blur(1, 5);
        console.log(image.toString());

        image.write(data =>
        {
            console.log(data.length);
        }, MagickFormat.Jpeg);
    });
}).catch(err => {
    console.error(err);
});