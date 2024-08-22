/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { TestImages } from '@test/test-images';

describe('MagickImage#gammaCorrect', () => {
    it('should gamma correct the image', () => {
        TestImages.Builtin.rose.use(image => {
            image.clone(other => {
                other.gammaCorrect(2);

                expect(image).toEqualImage(other, 0.21576);
            });
        });
    });

    it('should gamma correct the specified channels', () => {
        TestImages.Builtin.rose.use(image => {
            image.clone(other => {
                other.gammaCorrect(2, Channels.Red);

                expect(image).toEqualImage(other, 0.10594);
            });
        });
    });
});
