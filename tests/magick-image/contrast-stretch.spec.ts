/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { MagickColor } from '@src/magick-color';
import { MagickColors } from '@src/magick-colors';
import { Percentage } from '@src/types/percentage';
import { TestImages } from '@test/test-images';

describe('MagickImage#contrastStretch', () => {
    it('should stretch the image contrast to the given blackpoint', () => {
        TestImages.Builtin.wizard.use(image => {
            image.contrastStretch(new Percentage(10));

            expect(image).toHavePixelWithColor(160, 300, new MagickColor(10, 24, 179));
            expect(image).toHavePixelWithColor(325, 175, new MagickColor(255, 251, 206));
        });
    });

    it('should stretch the image contrast to the given blackpoint and whitepoint', () => {
        TestImages.Builtin.wizard.use(image => {
            image.contrastStretch(new Percentage(50), new Percentage(80));

            expect(image).toHavePixelWithColor(160, 300, MagickColors.Black);
            expect(image).toHavePixelWithColor(325, 175, MagickColors.Red);
        });
    });

    it('should stretch the image contrast of specified channels to the given blackpoint and whitepoint', () => {
        TestImages.Builtin.wizard.use(image => {
            image.contrastStretch(new Percentage(0), new Percentage(0), Channels.Blue);

            expect(image).toHavePixelWithColor(160, 300, new MagickColor(81, 91, 199));
            expect(image).toHavePixelWithColor(325, 175, new MagickColor(255, 252, 219));
        });
    });
});
