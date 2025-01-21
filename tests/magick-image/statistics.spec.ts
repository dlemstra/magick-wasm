/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { PixelChannel } from '@src/enums/pixel-channel';
import { TestFiles } from '@test/test-files';

describe('MagickImage#statistics', () => {
    it('should return the statistics for the all channels', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            const statistics = image.statistics();

            expect(statistics.channels.length).toBe(4);
            expect(statistics.channels).toContain(PixelChannel.Red);
            expect(statistics.channels).toContain(PixelChannel.Green);
            expect(statistics.channels).toContain(PixelChannel.Blue);
            expect(statistics.channels).toContain(PixelChannel.Composite);
        });
    });

    it('should return the statistics for the specified channels', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            const statistics = image.statistics(Channels.Blue);

            expect(statistics.channels.length).toBe(2);
            expect(statistics.channels).toContain(PixelChannel.Blue);
            expect(statistics.channels).toContain(PixelChannel.Composite);
        });
    });

    it('should return null as the statistics for a unknown channel', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            const statistics = image.statistics(Channels.Red);

            expect(statistics.getChannel(PixelChannel.Green)).toBeNull();
        });
    });
});
