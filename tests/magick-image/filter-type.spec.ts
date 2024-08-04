/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { FilterType } from '@src/enums/filter-type';
import { TestImages } from '@test/test-images';

describe('MagickImage#filterType', () => {
    it('should return the filter type the image', () => {
        TestImages.empty.use(image => {
            const filterType = image.filterType;
            expect(filterType).toBe(FilterType.Undefined);
        });
    });

    it('should change the filter type', () => {
        TestImages.empty.use(image => {
            image.filterType = FilterType.Lanczos;
            const filterType = image.filterType;
            expect(filterType).toBe(FilterType.Lanczos);
        });
    });
});
