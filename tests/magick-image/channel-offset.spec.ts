// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { PixelChannel } from '../../src/pixel-channel';
import { TestImages } from '../test-images';

describe('MagickImage#channelCount', () => {
    it('should return -1 when image does not contain channel', () => {
        TestImages.Builtin.logo.use(image => {
            expect(image.channelOffset(PixelChannel.Alpha)).toBe(-1);
        });
    });

    it('should return the index of the channel', () => {
        TestImages.Builtin.logo.use(image => {
            expect(image.channelOffset(PixelChannel.Red)).toBe(0);
            expect(image.channelOffset(PixelChannel.Green)).toBe(1);
            expect(image.channelOffset(PixelChannel.Blue)).toBe(2);
            expect(image.channelOffset(PixelChannel.Index)).toBe(3);
        });
    });
});
