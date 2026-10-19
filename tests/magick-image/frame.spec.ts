/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickGeometry } from '@src/types/magick-geometry';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#frame', () => {
    it('should use the default geometry', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 1, 1);
            image.clone(other => {
                image.frame();
                other.frame(new MagickGeometry(6, 6, 25, 25));

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should frame the image with the specified geometry', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 1, 1);
            const width = image.width;
            const height = image.height;
            image.frame(new MagickGeometry(3, 4, 10, 12));

            expect(image.width).toBe(width + 20);
            expect(image.height).toBe(height + 24);
        });
    });

    it('should frame the image with the specified width and height', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 1, 1);
            const width = image.width;
            const height = image.height;
            image.frame(30, 32);

            expect(image.width).toBe(width + 60);
            expect(image.height).toBe(height + 64);
        });
    });

    it('should frame the image with the specified bevels', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 1, 1);
            image.clone(other => {
                image.frame(30, 32);
                other.frame(30, 32, 3, 4);

                expect(image.width).toBe(other.width);
                expect(image.height).toBe(other.height);
                expect(image).not.toEqualImage(other);
            });
        });
    });
});
