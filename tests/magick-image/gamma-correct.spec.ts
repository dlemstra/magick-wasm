/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { TestFiles } from '@test/test-files';

describe('MagickImage#gammaCorrect', () => {
    it('should gamma correct the image', () => {
        TestFiles.Images.Builtin.rose.use(image => {
            image.clone(other => {
                other.gammaCorrect(2);

                expect(image).toEqualImage(other, 0.21576);
            });
        });
    });

    it('should gamma correct the specified channels', () => {
        TestFiles.Images.Builtin.rose.use(image => {
            image.clone(other => {
                other.gammaCorrect(2, Channels.Red);

                expect(image).toEqualImage(other, 0.10594);
            });
        });
    });
});
