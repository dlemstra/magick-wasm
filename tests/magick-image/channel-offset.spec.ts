// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { PixelChannel } from '../../src/pixel-channel';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#channelCount', () => {
    it('should return -1 when image does not contain channel', () => {
        expect(image.channelOffset(PixelChannel.Alpha)).toBe(-1);
    });

    it('should return the index of the channel', () => {
        expect(image.channelOffset(PixelChannel.Red)).toBe(0);
        expect(image.channelOffset(PixelChannel.Green)).toBe(1);
        expect(image.channelOffset(PixelChannel.Blue)).toBe(2);
        expect(image.channelOffset(PixelChannel.Index)).toBe(3);
    });
});
