const NodeEnvironment = require('jest-environment-node');
const MagickNative = require('../src/wasm/magick.js');

class CustomEnvironment extends NodeEnvironment {
    async setup() {
        await super.setup();

        let native;
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