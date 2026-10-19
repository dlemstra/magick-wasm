/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { TestFiles } from '@test/test-files';

describe('MagickImage#posterize', () => {
    it('should reduce the image to the specified number of levels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.posterize(4);

            expect(image).toHavePixelWithColor(400, 200, '#ffaa55');
        });
    });

    it('should use dithering by default', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.posterize(4);
                other.posterize(4, true);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should disable dithering when specified', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.posterize(4, false);
                other.posterize(4, true);

                expect(image).toEqualImage(other, 0.06148);
            });
        });
    });

    it('should only posterize the specified channels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.posterize(4, true, Channels.Red);

            expect(image).toHavePixelWithColor(400, 200, '#ff9868');
        });
    });
});
