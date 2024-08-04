/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { ImageMagick } from '@src/image-magick';
import { ColorSpace } from '@src/enums/color-space';
import { bogusAsyncMethod } from '@test/bogus-async';

describe('MagickImage#separate', () => {
    it('should supply the correct number of channels', () => {
        ImageMagick.read('logo:', (image) => {
            image.separate((images) => {
                expect(images.length).toBe(3);
                expect(images[0].width).toBe(image.width);
                expect(images[0].height).toBe(image.height);
            });
        });
    });

    it('should only supply the specified channels', () => {
        ImageMagick.read('logo:', (image) => {
            image.separate(Channels.Red | Channels.Green, (images) => {
                expect(images.length).toBe(2);
            });
        });
    });

    it('should supply image with gray colorspace', async () => {
        await ImageMagick.read('logo:', async (image) => {
            image.separate(Channels.Red, (images) => {
                expect(images.length).toBe(1);
                expect(images[0].colorSpace).toBe(ColorSpace.Gray);
            });

            await bogusAsyncMethod();
        });
    });
});
