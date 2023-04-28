// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../src/image-magick';
import { IMagickImage, MagickImage } from '../src/magick-image';
import { IMagickImageCollection, MagickImageCollection } from '../src/magick-image-collection';
import { MagickReadSettings } from '../src/settings/magick-read-settings';
import * as fs from 'fs';
import * as util from 'util';

export class TestFile {
    private readonly _fileName: string;
    private _image: IMagickImage | null = null;
    private _images: IMagickImageCollection | null = null;

    constructor(fileName: string) {
        this._fileName = fileName;
    }

    async read<TReturnType>(func: (image: IMagickImage) => TReturnType): Promise<TReturnType>;
    async read<TReturnType>(func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    async read<TReturnType>(settings: MagickReadSettings, func: (image: IMagickImage) => TReturnType): Promise<TReturnType>;
    async read<TReturnType>(settings: MagickReadSettings, func: (image: IMagickImage) => Promise<TReturnType>): Promise<TReturnType>;
    async read<TReturnType>(funcOrSettings: ((image: IMagickImage) => TReturnType | Promise<TReturnType>) | MagickReadSettings, func?: (image: IMagickImage) => TReturnType | Promise<TReturnType>): Promise<TReturnType> {
        if (funcOrSettings instanceof MagickReadSettings) {
            const data = await this.toBuffer();

            return ImageMagick.read(data, funcOrSettings, image => {
                /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
                return func!(image);
            });
        } else {
            if (this._image === null) {
                if (this._fileName.length === 0) {
                    this._image = MagickImage.create();
                } else if (this._fileName[this._fileName.length - 1] === ':') {
                    this._image = MagickImage.create(this._fileName);
                } else {
                    const data = await this.toBuffer();
                    this._image = MagickImage.create(data);
                }
            }

            return this._image.clone(image => {
                return funcOrSettings(image);
            });
        }
    }

    async readCollection<TReturnType>(func: (images: IMagickImageCollection) => TReturnType): Promise<TReturnType>;
    async readCollection<TReturnType>(func: (images: IMagickImageCollection) => Promise<TReturnType>): Promise<TReturnType>;
    async readCollection<TReturnType>(func: (images: IMagickImageCollection) => TReturnType | Promise<TReturnType>): Promise<TReturnType> {
        if (this._images === null) {
            this._images = MagickImageCollection.create();

            if (this._fileName[this._fileName.length - 1] === ':') {
                this._images.read(this._fileName);
            } else {
                const data = await this.toBuffer();
                this._images.read(data);
            }
        }

        return this._images.clone(images => {
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

export class TestFont {
    readonly name: string;
    readonly file: TestFile;

    constructor(name: string, fileName: string) {
        this.name = name;
        this.file = new TestFile(fileName);
    }
}

export class TestFiles {
    static readonly cmykJpg = new TestFile('tests/images/cmyk.jpg');
    static readonly empty = new TestFile('');
    static readonly fujiFilmFinePixS1ProJpg = new TestFile('tests/images/fuji-film-fine-pix-s1-pro.jpg');
    static readonly imageMagickJpg = new TestFile('tests/images/image-magick.jpg');
    static readonly redPng = new TestFile('tests/images/red.png');
    static readonly roseSparkleGif = new TestFile('tests/images/röse-sparkle.gif');

    static Builtin = class {
        static readonly logo = new TestFile('logo:');
        static readonly wizard = new TestFile('wizard:');
    }

    static Fonts = class {
        static readonly kaushanScriptRegularTtf = new TestFont('KaushanScript', 'tests/fonts/KaushanScript-Regular.ttf');
    }
}
