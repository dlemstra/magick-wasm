// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColors } from '../../src/magick-colors';
import '../custom-matcher';

let image: IMagickImage;
let writeMask: IMagickImage;

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
                expect(mask).toHavePixelWithColor(9, 14, '#ffff');
                expect(mask).toHavePixelWithColor(10, 15, '#00ff');
            }
        });
    });
});
