// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import * as fs from 'fs';
import * as util from 'util';
import { ImageMagick } from '../src/image-magick';
import { IMagickImage } from '../src/magick-image';
import { MagickReadSettings } from '../src/settings/magick-read-settings';

export class TestFile {
    private readonly _fileName: string;

    constructor(fileName: string) {
        this._fileName = fileName;
    }

    async read(func: (image: IMagickImage) => void): Promise<void>;
    async read(settings: MagickReadSettings, func: (image: IMagickImage) => void): Promise<void>;
    async read(funcOrSettings: ((image: IMagickImage) => void) | MagickReadSettings, func?: (image: IMagickImage) => void): Promise<void> {
        const data = await this.toBuffer();

        if (funcOrSettings instanceof MagickReadSettings) {
            ImageMagick.read(data, funcOrSettings, image => {
                if (typeof func !== 'undefined') func(image);
            });
        } else {
            ImageMagick.read(data, image => {
                funcOrSettings(image);
            });
        }
    }

    toBuffer(): Promise<Buffer> {
        const readFile = util.promisify(fs.readFile);
        return readFile(this._fileName);
    }

    toBufferSync(): Buffer {
        return fs.readFileSync(this._fileName);
    }
}
