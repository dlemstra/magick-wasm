/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#stereo', () => {
    it('should create an image that appears in stereo without changing the right image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.flop();
            TestFiles.Images.Builtin.logo.use(rightImage => {
                rightImage.clone(original => {
                    image.stereo(rightImage);

                    expect(image.width).toBe(640);
                    expect(image.height).toBe(480);
                    expect(image).toHavePixelWithColor(250, 375, '#22ffff');
                    expect(image).toHavePixelWithColor(380, 375, '#ff3e92');
                    expect(rightImage).toEqualImage(original);
                });
            });
        });
    });
});
