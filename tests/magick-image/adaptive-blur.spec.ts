/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#adaptiveBlur', () => {
    it('should change pixels of the image', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            image.adaptiveBlur(4, 2);
            expect(image).toHavePixelWithColor(56, 68, '#3e719cff');
        });
    });

    it('should use the correct default value for sigma', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.adaptiveBlur(3);
                other.adaptiveBlur(3, 1);

                expect(image).toEqualImage(other);
            })
        });
    });

    it('should use the correct default value for radius and sigma', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.adaptiveBlur();
                other.adaptiveBlur(0, 1);

                expect(image).toEqualImage(other);
            })
        });
    });
});
