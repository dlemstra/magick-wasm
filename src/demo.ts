import { initializeImageMagick, ImageMagick } from "./image-magick";
import { Magick } from "./magick";
import { Quantum } from "./quantum";

initializeImageMagick().then(async () => {
    console.log(Magick.imageMagickVersion);
    console.log('Delegates:', Magick.delegates);
    console.log('Features:', Magick.features);
    console.log('Quantum:', Quantum.depth);

    console.log('');
    ImageMagick.read('logo:', (image) => {
        console.log(image.toString());
    });

    ImageMagick.read('foobar:', () => { });
}).catch((err) => {
    console.error(err);
});