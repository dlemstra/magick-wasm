const NodeEnvironment = require('jest-environment-node');
const ImageMagick = require('../lib/image-magick.js');

let native = undefined;

class CustomEnvironment extends NodeEnvironment {
    async setup() {
        await super.setup();

        if (native !== undefined) {
            this.global.native = native;
            return;
        }

        await ImageMagick.initializeImageMagick();

        native = ImageMagick.nativeApi();

        this.global.native = native;
    }
}

module.exports = CustomEnvironment