/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { MagickImage } from '../../src/magick-image';
import { TestFiles } from '../test-files';
import { colorAssert } from '../color-assert';
import * as fs from "fs";

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#colorAlpha', () => {
    it('should color the alpha channel', () => {
        const data = fs.readFileSync(TestFiles.redPng);
        image.read(data);
        image.colorAlpha(MagickColors.Magenta);
        colorAssert(image, 350, 80, MagickColors.Magenta);
    });
});