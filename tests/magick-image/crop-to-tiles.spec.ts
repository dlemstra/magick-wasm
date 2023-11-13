// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickColors } from '@src/magick-colors';
import { MagickGeometry } from '@src/types/magick-geometry';
import { TestImages } from '@test/test-images';

describe('MagickImage#cropToTiles', () => {
    it('should crop the image to tiles', () => {
        TestImages.empty.use(image => {
            image.read(MagickColors.Black, 3, 3);

            const images = image.cropToTiles(new MagickGeometry(2, 2));

            expect(images.length).toBe(4);

            const first = images[0];
            expect(first.width).toBe(2);
            expect(first.height).toBe(2);

            const second = images[1];
            expect(second.width).toBe(1);
            expect(second.height).toBe(2);

            const third = images[2];
            expect(third.width).toBe(2);
            expect(third.height).toBe(1);

            const fourth = images[3];
            expect(fourth.width).toBe(1);
            expect(fourth.height).toBe(1);
        });
    });
});
