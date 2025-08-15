/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { PixelChannel } from '@src/enums/pixel-channel';
import { TestFiles } from '@test/test-files';

describe('PerceptualHash#sumSquaredDistance', () => {
    it('should return the distance', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            const phash = image.perceptualHash();

            let red = phash.getChannel(PixelChannel.Red);
            let green = phash.getChannel(PixelChannel.Green);
            red = expectToNotBeNull(red);
            green = expectToNotBeNull(green);

            const distance = red.sumSquaredDistance(green);
            expect(distance).toBeCloseTo(49.8306);
        });
    });
});
