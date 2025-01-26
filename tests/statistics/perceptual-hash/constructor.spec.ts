/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '@src/enums/color-space';
import { PixelChannel } from '@src/enums/pixel-channel';
import { PerceptualHash } from '@src/statistics/perceptual-hash';

describe('PerceptualHash#constructor', () => {
    it('should throw error when hash is empty', () => {
        expect(() => {
            new PerceptualHash('');
        }).toThrowError('Invalid hash size');
    });

    it('should parse the hash', () => {
        const hash = new PerceptualHash('81b4488652898d48a7a9622346206e620f8a646682939835e986ec98c78f887ae8c67f81b1e884c58a0d18af2d622718fd35623ffdeac9a78cbaedaa81d888434e824c683ad781c37895978c8688c426628ed61b216279b81b48887318a1628af43622a2619d162372');

        let red = hash.getChannel(PixelChannel.Red);
        red = expectToNotBeNull(red);

        expect(red.huPhash(ColorSpace.HSB, 0)).toBeCloseTo(6.8106);
        expect(red.huPhash(ColorSpace.HSB, 1)).toBeCloseTo(53.4841);
        expect(red.huPhash(ColorSpace.HSB, 2)).toBeCloseTo(53.8089);
        expect(red.huPhash(ColorSpace.HSB, 3)).toBeCloseTo(55.2649);
        expect(red.huPhash(ColorSpace.HSB, 4)).toBeCloseTo(57.5375);
        expect(red.huPhash(ColorSpace.HSB, 5)).toBeCloseTo(55.9022);
        expect(red.huPhash(ColorSpace.HSB, 6)).toBeCloseTo(57.5103);

        let green = hash.getChannel(PixelChannel.Green);
        green = expectToNotBeNull(green);

        expect(green.huPhash(ColorSpace.HSB, 0)).toBeCloseTo(53.1272);
        expect(green.huPhash(ColorSpace.HSB, 1)).toBeCloseTo(55.8897);
        expect(green.huPhash(ColorSpace.HSB, 2)).toBeCloseTo(56.5602);
        expect(green.huPhash(ColorSpace.HSB, 3)).toBeCloseTo(56.9155);
        expect(green.huPhash(ColorSpace.HSB, 4)).toBeCloseTo(402.082);
        expect(green.huPhash(ColorSpace.HSB, 5)).toBeCloseTo(399.825);
        expect(green.huPhash(ColorSpace.HSB, 6)).toBeCloseTo(402.290);

        let blue = hash.getChannel(PixelChannel.Blue);
        blue = expectToNotBeNull(blue);

        expect(blue.huPhash(ColorSpace.HSB, 0)).toBeCloseTo(-0.9120);
        expect(blue.huPhash(ColorSpace.HSB, 1)).toBeCloseTo(6.8628);
        expect(blue.huPhash(ColorSpace.HSB, 2)).toBeCloseTo(7.1620);
        expect(blue.huPhash(ColorSpace.HSB, 3)).toBeCloseTo(53.1848);
        expect(blue.huPhash(ColorSpace.HSB, 4)).toBeCloseTo(54.1518);
        expect(blue.huPhash(ColorSpace.HSB, 5)).toBeCloseTo(53.3702);
        expect(blue.huPhash(ColorSpace.HSB, 6)).toBeCloseTo(53.9351);
    });
});
