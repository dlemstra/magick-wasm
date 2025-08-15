/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '@src/enums/color-space';
import { IChannelPerceptualHash } from '@src/statistics/channel-perceptual-hash';
import { PixelChannel } from '@src/enums/pixel-channel';
import { TestFiles } from '@test/test-files';

describe('MagickImage#perceptualHash', () => {
    const assertChannel = (channel: IChannelPerceptualHash | null, channelIndex: number, xyyHuPhash: number, hsbHuPhash: number) => {
        channel = expectToNotBeNull(channel);

        expect(channel.huPhash(ColorSpace.XyY, channelIndex)).toBeCloseTo(xyyHuPhash);
        expect(channel.huPhash(ColorSpace.HSB, channelIndex)).toBeCloseTo(hsbHuPhash);
    };

    it('should raise error when specifying not enough colorspaces', () => {
        TestFiles.Images.Builtin.wizard.use((image) => {
            expect(() => {
                image.perceptualHash([]);
            }).toThrowError('Invalid number of colorspaces, the minimum is 1 and the maximum is 6');
        });
    });

    it('should raise error when specifying too much colorspaces', () => {
        TestFiles.Images.Builtin.wizard.use((image) => {
            expect(() => {
                image.perceptualHash([ColorSpace.XyY, ColorSpace.HCL, ColorSpace.CMY, ColorSpace.Luv, ColorSpace.Gray, ColorSpace.RGB, ColorSpace.YCC]);
            }).toThrowError('Invalid number of colorspaces, the minimum is 1 and the maximum is 6');
        });
    });

    it('should raise error when specifying duplicate colorspaces', () => {
        TestFiles.Images.Builtin.wizard.use((image) => {
            expect(() => {
                image.perceptualHash([ColorSpace.HCL, ColorSpace.HCL]);
            }).toThrowError('Specifying the same colorspace more than once is not allowed');
        });
    });

    it('should create the correct channel instances', () => {
        TestFiles.Images.Builtin.wizard.use((image) => {
            const phash = image.perceptualHash();
            expect(phash).not.toBeNull();

            let channel = phash.getChannel(PixelChannel.Red);
            assertChannel(channel, 0, 0.2294, 0.4027);
            assertChannel(channel, 1, 1.5603, 2.3442);
            assertChannel(channel, 2, 4.9037, 1.9733);
            assertChannel(channel, 3, 3.9198, 2.8120);
            assertChannel(channel, 4, 9.0911, 12.000);
            assertChannel(channel, 5, 6.3159, 4.6573);
            assertChannel(channel, 6, 12.000, 12.000);

            channel = phash.getChannel(PixelChannel.Green);
            assertChannel(channel, 0, 0.2322, 0.2693);
            assertChannel(channel, 1, 1.5657, 1.1348);
            assertChannel(channel, 2, 4.5268, 2.6334);
            assertChannel(channel, 3, 3.5221, 2.0866);
            assertChannel(channel, 4, 8.1552, 12.000);
            assertChannel(channel, 5, 5.3999, 3.1957);
            assertChannel(channel, 6, 12.000, 12.000);

            channel = phash.getChannel(PixelChannel.Blue);
            assertChannel(channel, 0, 0.5884, 0.6779);
            assertChannel(channel, 1, 2.2688, 2.4531);
            assertChannel(channel, 2, 4.8162, 5.5649);
            assertChannel(channel, 3, 4.0328, 4.8999);
            assertChannel(channel, 4, 9.6914, 10.9447);
            assertChannel(channel, 5, 5.4217, 6.3243);
            assertChannel(channel, 6, 12.000, 12.000);
        });
    });
});
