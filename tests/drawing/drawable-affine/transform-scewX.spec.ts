/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableAffine } from '@src/drawing/drawable-affine';

describe('DrawableAffine#transformSkewX', () => {
    it('should set the properties to the correct values', () => {
        const drawables = new DrawableAffine(2, 3, 4, 5, 6, 7);

        drawables.transformSkewX(8);

        expect(drawables.scaleX).toBeCloseTo(2.70270, 4);
        expect(drawables.scaleY).toBe(3);
        expect(drawables.shearX).toBeCloseTo(4.42162, 4);
        expect(drawables.shearY).toBe(5);
        expect(drawables.translateX).toBe(6);
        expect(drawables.translateY).toBe(7);
    });

    it('should set the properties to the correct values when using the default values', () => {
        const drawables = new DrawableAffine();

        drawables.transformSkewX(42);

        expect(drawables.scaleX).toBe(1);
        expect(drawables.scaleY).toBe(1);
        expect(drawables.shearX).toBeCloseTo(0.90040, 4);
        expect(drawables.shearY).toBe(0);
        expect(drawables.translateX).toBe(0);
        expect(drawables.translateY).toBe(0);
    });
});
