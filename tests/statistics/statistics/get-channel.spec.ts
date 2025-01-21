/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { PixelChannel } from '@src/enums/pixel-channel';
import { TestFiles } from '@test/test-files';

describe('Statistics#getChannel', () => {
    it('should return the statistics for a channel', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            const statistics = image.statistics(Channels.Blue);

            let channelStatistics = statistics.getChannel(PixelChannel.Blue);
            channelStatistics = expectToNotBeNull(channelStatistics);
            expect(channelStatistics.channel).toBe(PixelChannel.Blue);
            expect(channelStatistics.depth).toBe(8);
            expect(channelStatistics.entropy).toBeCloseTo(0.80694, 4);
            expect(channelStatistics.kurtosis).toBeCloseTo(-0.27825, 4);
            expect(channelStatistics.maximum).toBe(255);
            expect(channelStatistics.mean).toBeCloseTo(130.64240, 4);
            expect(channelStatistics.minimum).toBe(2);
            expect(channelStatistics.skewness).toBeCloseTo(-1.00552, 4);
            expect(channelStatistics.standardDeviation).toBeCloseTo(42.70252, 4);
        });
    });
});
