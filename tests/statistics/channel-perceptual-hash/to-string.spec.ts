/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { PixelChannel } from '@src/enums/pixel-channel';
import { TestFiles } from '@test/test-files';

describe('ChannelPerceptualHash#toString', () => {
    it('should return the correct value', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            const phash = image.perceptualHash();

            let red = phash.getChannel(PixelChannel.Red);
            red = expectToNotBeNull(red);

            const value = red.toString();
            expect(value).toEqual('a329782b94893d98af60621c78f08e62ee0ac1c9846fd61b208e63962ee061ab562ee0');
        });
    });
});
