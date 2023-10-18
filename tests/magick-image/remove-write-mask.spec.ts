// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IMagickImage, MagickImage } from '@src/magick-image';
import { MagickColors } from '@src/magick-colors';

let image: IMagickImage;
let writeMask: IMagickImage;

beforeEach(() => {
    image = MagickImage.create();
    writeMask = MagickImage.create();
});

afterEach(() => {
    image.dispose();
    writeMask.dispose();
});

describe('MagickImage#removeWriteMask', () => {
    it('should remove the write mask from the image', () => {
        image.read('logo:');
        writeMask.read(MagickColors.Black, image.width, image.height);

        image.setWriteMask(writeMask);

        image.getWriteMask(mask => {
            expect(mask).not.toBeNull();
        });

        image.removeWriteMask()

        image.getWriteMask(mask => {
            expect(mask).toBeNull();
        });
    });
});
