/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '@src/enums/color-space';
import { PixelChannel } from '@src/enums/pixel-channel';
import { TestFiles } from '@test/test-files';

describe('ChannelPerceptualHash#huPhash', () => {
    it('should throw error for invalid colorspace', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            const phash = image.perceptualHash();

            let red = phash.getChannel(PixelChannel.Red);
            red = expectToNotBeNull(red);

            expect(() => red.huPhash(ColorSpace.HCL, 0)).toThrowError('Invalid color space specified');
        });
    });

    it('should throw error for invalid channel index', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            const phash = image.perceptualHash();

            let red = phash.getChannel(PixelChannel.Red);
            red = expectToNotBeNull(red);

            expect(() => red.huPhash(ColorSpace.XyY, 7)).toThrowError('Invalid index specified');
        });
    });

    it('should return the correct value', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            const phash = image.perceptualHash();

            let red = phash.getChannel(PixelChannel.Red);
            red = expectToNotBeNull(red);

            const huPhashXyY = red.huPhash(ColorSpace.XyY, 6);
            expect(huPhashXyY).toBeCloseTo(12.000);

            const huPhashHSB = red.huPhash(ColorSpace.HSB, 6);
            expect(huPhashHSB).toBeCloseTo(12.000);
        });
    });
});
