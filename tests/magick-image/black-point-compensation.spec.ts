// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeAll(() => { ImageMagick._api = global.native; });

beforeEach(() => {
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#blackPointCompensation', () => {
    it('should have the correct default value', () => {
        expect(image.blackPointCompensation).toBe(false);
    });

    it('should be preserved when cloning an image', () => {
        image.read('logo:');
        image.blackPointCompensation = true;
        image.clone(clone => {
            expect(clone.blackPointCompensation).toBe(true);
        })
    });
});
