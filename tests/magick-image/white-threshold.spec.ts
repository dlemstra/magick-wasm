/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#whiteThreshold', () => {
    it('should make pixels above threshold white', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.whiteThreshold(new Percentage(50));

            expect(image).toHavePixelWithColor(296, 206, '#ffff68');
            expect(image).toHavePixelWithColor(400, 236, '#ffffff');
        });
    });

    it('should threshold the specified channels', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.whiteThreshold(new Percentage(50), Channels.Blue);

            expect(image).toHavePixelWithColor(296, 206, '#f79868');
            expect(image).toHavePixelWithColor(400, 236, '#ffffff');
        });
    });
});
