import { imageMagick } from "./index"

imageMagick().then((im) => {
    console.log(im.magick.imageMagickVersion);
    console.log('Delegates:', im.magick.delegates);
    console.log('Features:', im.magick.features);
    console.log('Quantum:', im.quantum.depth);

    console.log('');
    im.read('logo:', (image) => {
        console.log(image.toString());
    });

    im.read('foobar:', (_) => { });
}).catch((err) => {
    console.error(err);
});