// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from "../src/image-magick";
import { MagickImage } from "../src/magick-image";
import { MagickReadSettings } from "../src/settings/magick-read-settings";
import * as fs from "fs";
import * as util from "util";

export class TestFiles {
    static readonly fujiFilmFinePixS1ProJpg = 'tests/images/fuji-film-fine-pix-s1-pro.jpg';
    static readonly imageMagickJpg = 'tests/images/image-magick.jpg';
    static readonly redPng = 'tests/images/red.png';
}

export async function readTestFile(fileName: string, func: (image: MagickImage) => void): Promise<void>;
export async function readTestFile(fileName: string, settings: MagickReadSettings, func: (image: MagickImage) => void): Promise<void>;
export async function readTestFile(fileName: string, funcOrSettings: ((image: MagickImage) => void) | MagickReadSettings, func?: (image: MagickImage) => void): Promise<void> {
    const readFile = util.promisify(fs.readFile);
    const data = await readFile(fileName);

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