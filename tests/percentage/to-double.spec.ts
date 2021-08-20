// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { Percentage } from '../../src/percentage';

beforeEach(() => {
    ImageMagick._api = (global as any).native;
});

describe('MagickGeometry#toDouble', () => {
    it('should return the value .', () => {
        const percentage = new Percentage(10);

        expect(percentage.toDouble()).toBe(10);
    });
});
