// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '../../src/channels';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import '../custom-matcher';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#blur', () => {
    it('should change pixels of the image', () => {
        image.blur(5, 5);
        expect(image).toHavePixelWithColor(222, 60, '#ff6a6aff');
    });

    it('should only blur the specified channel', () => {
        image.blur(5, 5, Channels.Green);
        expect(image).toHavePixelWithColor(222, 60, '#ff6a00ff');
    });
});
