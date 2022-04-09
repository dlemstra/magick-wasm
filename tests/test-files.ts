// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../src/image-magick';
import { IMagickImage } from '../src/magick-image';
import { MagickReadSettings } from '../src/settings/magick-read-settings';
import * as fs from 'fs';
import * as util from 'util';

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
            ImageMagick.read(data, funcOrSettings, (image) => {
                if (typeof func !== 'undefined')
                    func(image);
            });
        } else {
            ImageMagick.read(data, (image) => {
                funcOrSettings(image);
            });
        }
    }

    toBufferSync(): Buffer {
        return fs.readFileSync(this._fileName);
    }

    toBuffer(): Promise<Buffer> {
        const readFile = util.promisify(fs.readFile);
        return readFile(this._fileName);
    }
}

export class TestFiles {
    static readonly fujiFilmFinePixS1ProJpg = new TestFile('tests/images/fuji-film-fine-pix-s1-pro.jpg');
    static readonly imageMagickJpg = new TestFile('tests/images/image-magick.jpg');
    static readonly kaushanScriptRegularTtf = new TestFile('tests/fonts/KaushanScript-Regular.ttf');
    static readonly redPng = new TestFile('tests/images/red.png');
    static readonly roseSparkleGif = new TestFile('tests/images/röse-sparkle.gif');
}
