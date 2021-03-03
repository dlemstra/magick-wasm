// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

const NodeEnvironment = require('jest-environment-node');
const ImageMagick = require('../lib/image-magick.js');

let native = undefined;
let loader = undefined;

class CustomEnvironment extends NodeEnvironment {
    async setup() {
        await super.setup();

        if (native !== undefined) {
            this.global.native = native;
            return;
        }

        if (loader === undefined) {
            loader = new Promise(resolve => {
                ImageMagick.initializeImageMagick().then(() => {
                    native = ImageMagick.ImageMagick._api;
                    resolve();
                });
            });
        }

        await loader;

        this.global.native = native;
    }
}

module.exports = CustomEnvironment