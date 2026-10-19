/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickGeometry } from '@src/types/magick-geometry';
import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#sample', () => {
    it('should resize the image to the specified size', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.sample(400, 200);

            expect(image.width).toBe(267);
            expect(image.height).toBe(200);
        });
    });

    it('should resize the image with geometry', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.sample(new MagickGeometry(300, 0));

            expect(image.width).toBe(300);
            expect(image.height).toBe(225);
        });
    });

    it('should resize the image to the specified percentage', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.sample(new Percentage(50));

            expect(image.width).toBe(320);
            expect(image.height).toBe(240);
        });
    });

    it('should resize the image to the specified width and height percentages', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.sample(new Percentage(50), new Percentage(25));

            expect(image.width).toBe(320);
            expect(image.height).toBe(120);
        });
    });
});
