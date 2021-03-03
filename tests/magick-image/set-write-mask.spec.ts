// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { MagickImage } from '../../src/magick-image';
import { colorAssert } from '../color-assert';

let image: MagickImage;
let writeMask: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    writeMask = MagickImage.create();
});

afterEach(() => {
    image.dispose();
    writeMask.dispose();
});

describe('MagickImage#setWriteMask', () => {
    it('should set mask for whole image', () => {
        image.read('logo:');
        writeMask.read(MagickColors.White, 10, 15);

        image.setWriteMask(writeMask);

        image.getWriteMask(mask => {
            expect(mask).not.toBeNull();
            if (mask !== null) {
                expect(mask.width).toBe(640);
                expect(mask.height).toBe(480);
                colorAssert(mask, 9, 14, '#ffff');
                colorAssert(mask, 10, 15, '#00ff');
            }
        });
    });
});