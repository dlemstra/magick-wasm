// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { AlphaOption } from '@src/enums/alpha-option';
import { PixelChannel } from '@src/enums/pixel-channel';
import { TestImages } from '@test/test-images';

describe('MagickImage#channels', () => {
    it('should return the correct channels', () => {
        TestImages.Builtin.logo.use(image => {
            const channels = image.channels;

            expect(channels.length).toBe(3);
            expect(channels[0]).toBe(PixelChannel.Red);
            expect(channels[1]).toBe(PixelChannel.Green);
            expect(channels[2]).toBe(PixelChannel.Blue);
        });
    });

    it('should return the correct channels for a cmyk image', () => {
        TestImages.cmykJpg.use(image => {
            image.alpha(AlphaOption.Activate);

            const channels = image.channels;

            expect(channels.length).toBe(5);
            expect(channels[0]).toBe(PixelChannel.Red);
            expect(channels[1]).toBe(PixelChannel.Green);
            expect(channels[2]).toBe(PixelChannel.Blue);
            expect(channels[3]).toBe(PixelChannel.Black);
            expect(channels[4]).toBe(PixelChannel.Alpha);
        });
    });
});
