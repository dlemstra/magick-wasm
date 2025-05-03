/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { PixelChannel } from '@src/enums/pixel-channel';
import { TestFiles } from '@test/test-files';

describe('MagickImage#cycleColormap', () => {
    it('should change the colormap', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.getPixels(pixels => {
                const pixel = pixels.getPixel(433, 422);
                const channelIndex = pixels.getChannelIndex(PixelChannel.Index);
                const oldIndex = pixel[channelIndex];
                expect(oldIndex).toBe(190);
            });

            image.cycleColormap(10);

            image.getPixels(pixels => {
                const pixel = pixels.getPixel(433, 422);
                const channelIndex = pixels.getChannelIndex(PixelChannel.Index);
                const newIndex = pixel[channelIndex];
                expect(newIndex).toBe(200);
            });
        })
    });

    it('should allow a negative value', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.cycleColormap(-10);
        })
    });

    it('should add a color map to the image', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            expect(image.colormapSize).toBe(-1);

            image.cycleColormap(110);

            expect(image.colormapSize).toBe(256);
        })
    });
});
