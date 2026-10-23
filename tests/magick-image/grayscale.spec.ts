/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { PixelChannel } from '@src/enums/pixel-channel';
import { PixelIntensityMethod } from '@src/enums/pixel-intensity-method';
import { TestFiles } from '@test/test-files';

describe('MagickImage#grayscale', () => {
    it('should use the default pixel intensity method', () => {
        TestFiles.Images.Color.purple.use(imageA => {
            TestFiles.Images.Color.purple.use(imageB => {
                imageA.grayscale();
                assert.equal(imageA.channelCount, 1);
                assert.equal(PixelChannel.Red, imageA.channels.at(0));

                imageB.grayscale(PixelIntensityMethod.Brightness);
                assert.equal(imageB.channelCount, 1);
                assert.equal(PixelChannel.Red, imageB.channels.at(0));

                expect(imageA).toEqualImage(imageB, 0.36078);
            });
        });
    });
});
