/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { DitherMethod } from '@src/enums/dither-method';
import { TestFiles } from '@test/test-files';

describe('MagickImage#posterize', () => {
    it('should reduce the image to the specified number of levels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.posterize(4);

            expect(image).toHavePixelWithColor(400, 200, '#ffaa55');
        });
    });

    it('should use no dithering by default', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.posterize(4);
                other.posterize(4, DitherMethod.No);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should use the specified dither method', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.posterize(4, DitherMethod.FloydSteinberg);
                other.posterize(4, DitherMethod.No);

                expect(image).not.toEqualImage(other);
            });
        });
    });

    it('should only posterize the specified channels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.posterize(4, DitherMethod.No, Channels.Red);

            expect(image).toHavePixelWithColor(400, 200, '#ff9868');
        });
    });
});
