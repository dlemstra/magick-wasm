// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../src/image-magick';
import { IMagickImage } from '../src/magick-image';
import { IMagickImageCollection } from '../src/magick-image-collection';
import { MagickReadSettings } from '../src/settings/magick-read-settings';
import * as fs from 'fs';
import * as util from 'util';

export class TestFile {
    private readonly _fileName: string;
    constructor(fileName: string) {
        this._fileName = fileName;
    }

    async read<TReturnType>(func: (image: IMagickImage) => TReturnType): Promise<TReturnType>;
    async read<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    async read<TReturnType>(settings: MagickReadSettings, func: (image: IMagickImage) => TReturnType): Promise<TReturnType>;
    async read<TReturnType>(settings: MagickReadSettings, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    async read<TReturnType>(funcOrSettings: ((image: IMagickImage) => TReturnType | Promise<TReturnType>) | MagickReadSettings, func?: (image: IMagickImage) => TReturnType | Promise<TReturnType>): Promise<TReturnType> {
        const data = await this.toBuffer();

        if (funcOrSettings instanceof MagickReadSettings) {
            return ImageMagick.read(data, funcOrSettings, image => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return func!(image);
            });
        } else {
            return ImageMagick.read(data, (image) => {
                return funcOrSettings(image);
            });
        }
    }

    async readCollection<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): Promise<TReturnType>;
    async readCollection<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    async readCollection<TReturnType>(func: (images: IMagickImageCollection) => TReturnType | Promise<TReturnType>): Promise<TReturnType> {
        const data = await this.toBuffer();

        return ImageMagick.readCollection(data, images => {
            return func(images);
        });
    }

    toBuffer(): Promise<Buffer> {
        const readFile = util.promisify(fs.readFile);
        return readFile(this._fileName);
    }

    toBufferSync(): Buffer {
        return fs.readFileSync(this._fileName);
    }
}

export class TestFiles {
    static readonly fujiFilmFinePixS1ProJpg = new TestFile('tests/images/fuji-film-fine-pix-s1-pro.jpg');
    static readonly imageMagickJpg = new TestFile('tests/images/image-magick.jpg');
    static readonly kaushanScriptRegularTtf = new TestFile('tests/fonts/KaushanScript-Regular.ttf');
    static readonly redPng = new TestFile('tests/images/red.png');
    static readonly roseSparkleGif = new TestFile('tests/images/röse-sparkle.gif');
}
