/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { PixelChannel } from '@src/enums/pixel-channel';
import { TestFiles } from '@test/test-files';

describe('PixelCollection#getChannelIndex', () => {
    it('should return the index of the pixel channel', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.getPixels(pixels => {
                const redIndex = pixels.getChannelIndex(PixelChannel.Red);
                expect(redIndex).toBe(0);

                const greenIndex = pixels.getChannelIndex(PixelChannel.Green);
                expect(greenIndex).toBe(1);

                const blueIndex = pixels.getChannelIndex(PixelChannel.Blue);
                expect(blueIndex).toBe(2);

                const indexIndex = pixels.getChannelIndex(PixelChannel.Index);
                expect(indexIndex).toBe(3);
            });
        });
    });

    it('should return -1 when the image does not contain the specified channel', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.getPixels(pixels => {
                const alphIndex = pixels.getChannelIndex(PixelChannel.Alpha);
                expect(alphIndex).toBe(-1);
            });
        });

    });
});
