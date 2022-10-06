// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { FilterType } from '../../src/filter-type';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#filterType', () => {
    it('should return the filter type the image', () => {
        const { filterType } = image;
        expect(filterType).toBe(FilterType.Undefined);
    });

    it('should change the filter type', () => {
        image.filterType = FilterType.Lanczos;
        const { filterType } = image;
        expect(filterType).toBe(FilterType.Lanczos);
    });
});
