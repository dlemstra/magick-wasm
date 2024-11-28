/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Gravity } from '@src/enums/gravity';
import { MagickColors } from '@src/magick-colors';
import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';

describe('MagickImage#extent', () => {
    it('should extent the image', () => {
        TestFiles.Images.Color.black.use(image => {
            image.extent(2, 3);

            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
        });
    });

    it('should extent the image with the specified color', () => {
        TestFiles.Images.Color.black.use(image => {
            image.extent(2, 3, MagickColors.Magenta);

            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
            expect(image).toHavePixelWithColor(0, 0, MagickColors.Magenta);
        });
    });

    it('should extent the image with the specified gravity', () => {
        TestFiles.Images.Color.black.use(image => {
            image.backgroundColor = MagickColors.Magenta;
            image.extent(2, 3, Gravity.Southeast);

            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
            expect(image).toHavePixelWithColor(0, 0, MagickColors.Magenta);
        });
    });

    it('should extent the image with the specified geometry', () => {
        TestFiles.Images.Color.black.use(image => {
            image.extent(new MagickGeometry(2, 3));

            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
        });
    });

    it('should extent the image with the specified geometry and offset', () => {
        TestFiles.Images.Color.black.use(image => {
            image.backgroundColor = MagickColors.Magenta;
            image.extent(new MagickGeometry(-1, -1, 2, 3));

            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
            expect(image).toHavePixelWithColor(0, 0, MagickColors.Magenta);
        });
    });

    it('should extent the image with the specified geometry and color', () => {
        TestFiles.Images.Color.black.use(image => {
            image.extent(new MagickGeometry(2, 3), MagickColors.Magenta);

            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
            expect(image).toHavePixelWithColor(1, 1, MagickColors.Magenta);
        });
    });

    it('should extent the image with the specified geometry and gravity', () => {
        TestFiles.Images.Color.black.use(image => {
            image.backgroundColor = MagickColors.Magenta;
            image.extent(new MagickGeometry(2, 3), Gravity.Southwest);

            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
            expect(image).toHavePixelWithColor(0, 0, MagickColors.Magenta);
        });
    });

    it('should extent the image with the specified geometry, gravity and color', () => {
        TestFiles.Images.Color.black.use(image => {
            image.extent(new MagickGeometry(2, 3), Gravity.Southwest, MagickColors.Magenta);

            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
            expect(image).toHavePixelWithColor(0, 0, MagickColors.Magenta);
        });
    });
});
