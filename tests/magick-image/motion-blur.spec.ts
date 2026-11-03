/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { TestFiles } from '@test/test-files';

describe('MagickImage#motionBlur', () => {
    it('should change pixels of the image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.motionBlur(10, 10, -90);

            expect(image).toHavePixelWithColor(222, 60, '#ff0404');
        });
    });

    it('should use the default channels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.motionBlur(10, 10, -90);
                other.motionBlur(10, 10, -90, Channels.Undefined);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should only blur the specified channel', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.motionBlur(10, 10, -90, Channels.Green);

            expect(image).toHavePixelWithColor(222, 60, '#ff0400');
        });
    });
});
