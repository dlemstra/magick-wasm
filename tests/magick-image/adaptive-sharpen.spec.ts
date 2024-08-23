/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { TestImages } from '@test/test-images';

describe('MagickImage#adaptiveSharpen', () => {
    it('should sharpen the image', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(image => {
            image.adaptiveSharpen();

            TestImages.fujiFilmFinePixS1ProJpg.use(original => {
                expect(image).toEqualImage(original, 0.01689);
            });
        });
    });

    it('should use the correct default values', () => {
        TestImages.Builtin.logo.use(image => {
            TestImages.Builtin.logo.use(other => {
                image.adaptiveSharpen();
                other.adaptiveSharpen(0, 1, Channels.Undefined);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should sharpen the specified channels of the image', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(image => {
            image.adaptiveSharpen(Channels.Red);

            TestImages.fujiFilmFinePixS1ProJpg.use(original => {
                expect(image).toEqualImage(original, 0.01586);
            });
        });
    });

    it('should use the correct default values', () => {
        TestImages.Builtin.logo.use(image => {
            TestImages.Builtin.logo.use(other => {
                other.adaptiveSharpen(10, 5);

                expect(image).toEqualImage(other, 0.03321);
            });
        });
    });
});
