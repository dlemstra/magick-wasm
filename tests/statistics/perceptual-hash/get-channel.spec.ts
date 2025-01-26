/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { PixelChannel } from '@src/enums/pixel-channel';
import { PerceptualHash } from '@src/statistics/perceptual-hash';

describe('PerceptualHash#getChannel', () => {
    it('should return null when the channel is invalid', () => {
        const hash = new PerceptualHash('81b4488652898d48a7a9622346206e620f8a646682939835e986ec98c78f887ae8c67f81b1e884c58a0d18af2d622718fd35623ffdeac9a78cbaedaa81d888434e824c683ad781c37895978c8688c426628ed61b216279b81b48887318a1628af43622a2619d162372');
        const channel = hash.getChannel(PixelChannel.Black);

        expect(channel).toBeNull();
    });
});
