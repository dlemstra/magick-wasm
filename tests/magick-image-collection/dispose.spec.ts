// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickImageCollection } from '../../src/magick-image-collection';

beforeAll(() => { ImageMagick._api = global.native; });

describe('MagickImageCollection#dispose', () => {
    it('should dispose the images', () => {
        const images = MagickImageCollection.create();
        images.read('logo:');

        expect(images.length).toBe(1);
        images.dispose();
        expect(images.length).toBe(0);
    });
});
