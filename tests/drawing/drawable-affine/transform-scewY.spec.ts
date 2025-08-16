/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableAffine } from '@src/drawing/drawable-affine';

describe('DrawableAffine#transformSkewX', () => {
    it('should set the properties to the correct values', () => {
        const drawables = new DrawableAffine(2, 3, 4, 5, 6, 7);

        drawables.transformSkewY(8);

        expect(drawables.scaleX).toBe(2);
        expect(drawables.scaleY).toBeCloseTo(3.56216, 4);
        expect(drawables.shearX).toBe(4);
        expect(drawables.shearY).toBeCloseTo(5.28108, 4);
        expect(drawables.translateX).toBe(6);
        expect(drawables.translateY).toBe(7);
    });

    it('should set the properties to the correct values when using the default values', () => {
        const drawables = new DrawableAffine();

        drawables.transformSkewY(42);

        expect(drawables.scaleX).toBe(1);
        expect(drawables.scaleY).toBe(1);
        expect(drawables.shearX).toBe(0);
        expect(drawables.shearY).toBeCloseTo(0.90040, 4);
        expect(drawables.translateX).toBe(0);
        expect(drawables.translateY).toBe(0);
    });
});
