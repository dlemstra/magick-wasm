/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { PixelChannel } from '@src/enums/pixel-channel';
import { TestImages } from '@test/test-images';

describe('MagickImage#_channelOffset', () => {
    it('should return -1 when image does not contain channel', () => {
        TestImages.Builtin.logo.use(image => {
            expect(image._channelOffset(PixelChannel.Alpha)).toBe(-1);
        });
    });

    it('should return the index of the channel', () => {
        TestImages.Builtin.logo.use(image => {
            expect(image._channelOffset(PixelChannel.Red)).toBe(0);
            expect(image._channelOffset(PixelChannel.Green)).toBe(1);
            expect(image._channelOffset(PixelChannel.Blue)).toBe(2);
            expect(image._channelOffset(PixelChannel.Index)).toBe(3);
        });
    });
});
