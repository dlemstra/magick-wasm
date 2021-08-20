// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColors } from '../../src/magick-colors';
import { TestFiles, readTestFile } from '../test-files';
import { colorAssert } from '../color-assert';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#colorAlpha', () => {
    it('should color the alpha channel', async () => {
        await readTestFile(TestFiles.redPng, image => {
            image.colorAlpha(MagickColors.Magenta);
            colorAssert(image, 350, 80, MagickColors.Magenta);
        });
    });
});
