// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { OrientationType } from '../../src/orientation-type';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#autoOrient', () => {
    it('should rotate the image', () => {
        image.orientation = OrientationType.LeftTop;
        image.autoOrient();
        expect(image.orientation).toBe(OrientationType.TopLeft);
        expect(image.width).toBe(480);
        expect(image.height).toBe(640);
    });
});