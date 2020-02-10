import { initializeImageMagick, ImageMagick } from "./image-magick";
import { LogEvents } from "./log-events";
import { Magick } from "./magick";
import { Quantum } from "./quantum";

initializeImageMagick().then(async (im) => {
    const messages: string[] = [];
    Magick.logEvents(LogEvents.Trace | LogEvents.Coder, (type, message) => {
        messages.push(message);
    });

    console.log(Magick.imageMagickVersion);
    console.log('Delegates:', Magick.delegates);
    console.log('Features:', Magick.features);
    console.log('Quantum:', Quantum.depth);

    console.log('');
    ImageMagick.read('logo:', (image) => {
        console.log(image.toString());
    });

    console.log(messages.length, messages.pop());

    ImageMagick.read('foobar:', () => { });
}).catch((err) => {
    console.error(err);
});