// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '../../src/channels';
import { PixelChannel } from '../../src/pixel-channel';
import { TestImages } from '../test-images';

describe('MagickImage#statistics', () => {
    it('should return the statistics for the all channels', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(image => {
            const statistics = image.statistics();

            expect(statistics.channels.length).toBe(4);
            expect(statistics.channels).toContain(PixelChannel.Red);
            expect(statistics.channels).toContain(PixelChannel.Green);
            expect(statistics.channels).toContain(PixelChannel.Blue);
            expect(statistics.channels).toContain(PixelChannel.Composite);
        });
    });

    it('should return the statistics for the specified channels', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(image => {
            const statistics = image.statistics(Channels.Blue);

            expect(statistics.channels.length).toBe(2);
            expect(statistics.channels).toContain(PixelChannel.Blue);
            expect(statistics.channels).toContain(PixelChannel.Composite);
        });
    });

    it('should return the statistics for a channel', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(image => {
            const statistics = image.statistics(Channels.Blue);

            const channelStatistics = statistics.getChannel(PixelChannel.Blue);
            expect(channelStatistics).not.toBeNull();
            if (channelStatistics !== null) {
                expect(channelStatistics.channel).toBe(PixelChannel.Blue);
                expect(channelStatistics.depth).toBe(8);
                expect(channelStatistics.entropy).toBeCloseTo(0.80694);
                expect(channelStatistics.kurtosis).toBeCloseTo(-0.27825);
                expect(channelStatistics.maximum).toBe(255);
                expect(channelStatistics.mean).toBeCloseTo(130.64240);
                expect(channelStatistics.minimum).toBe(2);
                expect(channelStatistics.skewness).toBeCloseTo(-1.00552);
                expect(channelStatistics.standardDeviation).toBeCloseTo(42.70252);
            }
        });
    });

    it('should return the statistics for the composite channel', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(image => {
            const statistics = image.statistics(Channels.Green);

            const channelStatistics = statistics.composite();
            expect(channelStatistics.channel).toBe(PixelChannel.Composite);
            expect(channelStatistics.depth).toBe(8);
            expect(channelStatistics.entropy).toBeCloseTo(0.76887);
            expect(channelStatistics.kurtosis).toBeCloseTo(0.65771);
            expect(channelStatistics.maximum).toBe(255);
            expect(channelStatistics.mean).toBeCloseTo(100.22261);
            expect(channelStatistics.minimum).toBe(1);
            expect(channelStatistics.skewness).toBeCloseTo(-0.65869);
            expect(channelStatistics.standardDeviation).toBeCloseTo(32.03352);
        });
    });

    it('should return null as the statistics for a unknown channel', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(image => {
            const statistics = image.statistics(Channels.Red);

            expect(statistics.getChannel(PixelChannel.Green)).toBeNull();
        });
    });
});
