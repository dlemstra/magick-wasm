// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { Percentage } from '../../src/percentage';

beforeEach(() => {
    ImageMagick._api = (global as any).native;
});

describe('MagickGeometry#toQuantum', () => {
    it('should return the value as a percentage of the Quantum max.', () => {
        const percentage = new Percentage(10);

        expect(percentage.toQuantum()).toBe(25.5);
    });
});