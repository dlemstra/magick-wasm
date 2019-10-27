import { imageMagick } from "./index";
import { LogEvents } from "./log-events";

imageMagick().then((im) => {
    let messages: string[] = [];
    im.magick.logEvents(LogEvents.Trace | LogEvents.Coder, (type, message) => {
        messages.push(message);
    });

    console.log(im.magick.imageMagickVersion);
    console.log('Delegates:', im.magick.delegates);
    console.log('Features:', im.magick.features);
    console.log('Quantum:', im.quantum.depth);

    console.log('');
    im.read('logo:', (image) => {
        console.log(image.toString());
    });

    console.log(messages.length, messages.pop());

    im.read('foobar:', (_) => { });
}).catch((err) => {
    console.error(err);
});