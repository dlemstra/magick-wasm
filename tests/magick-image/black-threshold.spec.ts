/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#blackThreshold', () => {
    it('should make pixels above threshold black', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.blackThreshold(new Percentage(50));

            expect(image).toHavePixelWithColor(302, 246, '#000000');
            expect(image).toHavePixelWithColor(528, 444, '#000000');
        });
    });

    it('should threshold the specified channels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.blackThreshold(new Percentage(50), Channels.Blue);

            expect(image).toHavePixelWithColor(302, 246, '#212000');
            expect(image).toHavePixelWithColor(528, 444, '#040700');
        });
    });
});
