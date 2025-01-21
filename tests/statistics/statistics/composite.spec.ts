/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { PixelChannel } from '@src/enums/pixel-channel';
import { TestFiles } from '@test/test-files';

describe('Statistics#composite', () => {
    it('should return the statistics for the composite channel', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            const statistics = image.statistics(Channels.Green);

            const channelStatistics = statistics.composite();
            expect(channelStatistics.channel).toBe(PixelChannel.Composite);
            expect(channelStatistics.depth).toBe(8);
            expect(channelStatistics.entropy).toBeCloseTo(0.76887, 4);
            expect(channelStatistics.kurtosis).toBeCloseTo(0.65771, 4);
            expect(channelStatistics.maximum).toBe(255);
            expect(channelStatistics.mean).toBeCloseTo(100.22261, 4);
            expect(channelStatistics.minimum).toBe(1);
            expect(channelStatistics.skewness).toBeCloseTo(-0.65869, 4);
            expect(channelStatistics.standardDeviation).toBeCloseTo(32.03352, 4);
        });
    });
});
