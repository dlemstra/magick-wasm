/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { MagickColors } from '@src/magick-colors';
import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';

describe('MagickImage#determineBitDepth', () => {
    it('should return the bit depth of the specified channel', () => {
        TestFiles.Images.redPng.use(image => {
            expect(image.determineBitDepth(Channels.Red)).toBe(1);
            expect(image.determineBitDepth(Channels.Green)).toBe(1);
            expect(image.determineBitDepth(Channels.Blue)).toBe(1);
            expect(image.determineBitDepth(Channels.Alpha)).toBe(8);

            image.extent(new MagickGeometry(700, 200), MagickColors.Green);

            expect(image.determineBitDepth(Channels.Red)).toBe(8);
            expect(image.determineBitDepth(Channels.Green)).toBe(8);
            expect(image.determineBitDepth(Channels.Blue)).toBe(1);
            expect(image.determineBitDepth(Channels.Alpha)).toBe(1);
        });
    });

    it('should return the bit depth of the image', () => {
        TestFiles.Images.redPng.use(image => {
            expect(image.determineBitDepth()).toBe(8);
        });
    });
});

