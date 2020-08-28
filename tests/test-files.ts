/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { MagickImage } from "../src/magick-image";
import * as fs from "fs";
import * as util from "util";
import { ImageMagick } from "../src/image-magick";

export class TestFiles {
    static readonly imageMagickJpg = 'tests/images/image-magick.jpg';
    static readonly redPng = 'tests/images/red.png';
}

export async function readTestFile(fileName: string, func: (image: MagickImage) => void): Promise<void> {
    const readFile = util.promisify(fs.readFile);
    const data = await readFile(fileName);
    ImageMagick.read(data, (image) => {
        func(image);
    });
}