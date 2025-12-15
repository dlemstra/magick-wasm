/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColor } from '@src/magick-color';
import { Percentage } from '@src/types/percentage';

describe('MagickColor#fuzzyEquals', () => {
    it('should return true when color is the same instance', () => {
        const color = new MagickColor(10, 20, 30, 40);
        expect(color.fuzzyEquals(color, new Percentage(0))).toBe(true);
    });

    it('should return true when color is equal', () => {
        const color = new MagickColor(10, 20, 30, 40);
        const otherColor = new MagickColor(10, 20, 30, 40);

        expect(color.fuzzyEquals(otherColor, new Percentage(0))).toBe(true);
    });

    it('should return false when colors are not equal', () => {
        const color = new MagickColor(10, 20, 30);
        const otherColor = new MagickColor(10, 20, 31);

        expect(color.fuzzyEquals(otherColor, new Percentage(0))).toBe(false);
    });

    it('should return false when colors with alpha are not equal', () => {
        const color = new MagickColor(10, 20, 30, 40);
        const otherColor = new MagickColor(10, 20, 30, 41);

        expect(color.fuzzyEquals(otherColor, new Percentage(0))).toBe(false);
    });

    it('should return true when colors are not equal but distance is high enough', () => {
        const color = new MagickColor(10, 20, 30);
        const otherColor = new MagickColor(10, 20, 31);

        expect(color.fuzzyEquals(otherColor, new Percentage(1))).toBe(true);
    });
});
