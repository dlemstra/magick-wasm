const NodeEnvironment = require('jest-environment-node');
const MagickNative = require('../src/wasm/magick.js');

let native = undefined;

class CustomEnvironment extends NodeEnvironment {
    async setup() {
        await super.setup();

        if (native !== undefined) {
            this.global.native = native;
            return;
        }

        const loader = new Promise(function(resolve) {
            MagickNative().then((result) => {
                native = result;
                resolve.apply();
            })
        });

        await loader;
        this.global.native = native;
    }
}

module.exports = CustomEnvironment