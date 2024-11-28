/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';

describe('MagickImage#thumbnail', () => {
    it('should resize the image to within the given dimensions', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.thumbnail(100, 100);

            expect(image.width).toBe(100);
            expect(image.height).toBe(75);
        });
    });

    it('should resize the image based on the given width', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.thumbnail(150, 0);

            expect(image.width).toBe(150);
            expect(image.height).toBe(113);
        });
    });

    it('should resize the image based on the given height', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.thumbnail(0, 100);

            expect(image.width).toBe(133);
            expect(image.height).toBe(100);
        });
    });

    it('should resize based on the given geometry', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.thumbnail(new MagickGeometry(200, 200));

            expect(image.width).toBe(200);
            expect(image.height).toBe(150);
        });
    });

    it('should remove all image profiles except the icc/icm profile', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            expect(image.profileNames.length).toBe(5);

            image.thumbnail(100, 100);

            expect(image.profileNames.length).toBe(1);
            expect(image.profileNames[0]).toBe('icc');
        });
    });
});
