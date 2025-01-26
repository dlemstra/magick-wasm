/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '@src/enums/color-space';
import { ChannelPerceptualHash } from '@src/statistics/channel-perceptual-hash';
import { PixelChannel } from '@src/enums/pixel-channel';

describe('ChannelPerceptualHash#constructor', () => {
    it('should parse the specified hash', () => {
        const red = new ChannelPerceptualHash(PixelChannel.Red, [ColorSpace.HSL, ColorSpace.CMY], "ac1c7846fc61b228e63562ee061ab562ee0af37b851388d0068efd662eb261c4262ee0");

        const huPhashXyY = red.huPhash(ColorSpace.HSL, 1);
        expect(huPhashXyY).toBeCloseTo(54.246);

        const huPhashHSB = red.huPhash(ColorSpace.CMY, 1);
        expect(huPhashHSB).toBeCloseTo(54.508);
    });
});
