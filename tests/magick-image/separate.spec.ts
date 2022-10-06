// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '../../src/channels';
import { ColorSpace } from '../../src/color-space';
import { ImageMagick } from '../../src/image-magick';

beforeEach(() => { ImageMagick._api = global.native; });

describe('MagickImage#separate', () => {
    it('should supply the correct number of channels', () => {
        ImageMagick.read('logo:', image => {
            image.separate(images => {
                expect(images.length).toBe(3);
                expect(images[0].width).toBe(image.width);
                expect(images[0].height).toBe(image.height);
            });
        });
    });

    it('should only supply the specified channels', () => {
        ImageMagick.read('logo:', image => {
            image.separate(images => {
                expect(images.length).toBe(2);
            }, Channels.Red | Channels.Green);
        });
    });

    it('should supply image with gray colorspace', () => {
        ImageMagick.read('logo:', image => {
            image.separate(images => {
                expect(images.length).toBe(1);
                expect(images[0].colorSpace).toBe(ColorSpace.Gray);
            }, Channels.Red);
        });
    });
});
