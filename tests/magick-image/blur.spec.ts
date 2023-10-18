// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '@src/channels';
import { TestImages } from '@test/test-images';

describe('MagickImage#blur', () => {
    it('should change pixels of the image', () => {
        TestImages.Builtin.logo.use(image => {
            image.blur(5, 5);
            expect(image).toHavePixelWithColor(222, 60, '#ff6a6aff');
        });
    });

    it('should only blur the specified channel', () => {
        TestImages.Builtin.logo.use(image => {
            image.blur(5, 5, Channels.Green);
            expect(image).toHavePixelWithColor(222, 60, '#ff6a00ff');
        });
    });
});
