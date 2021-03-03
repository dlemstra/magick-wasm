// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickColor } from '../../src/magick-color';
import { Quantum } from '../../src/quantum';

beforeEach(() => {
    ImageMagick._api = (global as any).native;
});

describe('MagickColor#toShortString', () => {
    it('should format the color', () => {
        const color = new MagickColor(10, 20, 30, 40);

        expect(color.toShortString()).toBe('#0a141e28');
    });

    it('should not return the alpha channel when value is opaque', () => {
        const color = new MagickColor(10, 20, 30);

        expect(color.toShortString()).toBe('#0a141e');
    });

    it('should return cmyka color for cmyk color', () => {
        const color = new MagickColor(10, 20, 30, 40, Quantum.max);

        expect(color.toShortString()).toBe('cmyka(10,20,30,40)');
    });
});