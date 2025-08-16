/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableAffine } from '@src/drawing/drawable-affine';

describe('DrawableAffine#transformRotation', () => {
    it('should set the properties to the correct values', () => {
        const drawables = new DrawableAffine(2, 3, 4, 5, 6, 7);

        drawables.transformRotation(20);

        expect(drawables.scaleX).toBeCloseTo(0.16928, 4);
        expect(drawables.scaleY).toBeCloseTo(4.18715, 4);
        expect(drawables.shearX).toBeCloseTo(2.73271, 4);
        expect(drawables.shearY).toBeCloseTo(5.38250, 4);
        expect(drawables.translateX).toBe(6);
        expect(drawables.translateY).toBe(7);
    });

    it('should set the properties to the correct values when using the default values', () => {
        const drawables = new DrawableAffine();

        drawables.transformRotation(20);

        expect(drawables.scaleX).toBeCloseTo(0.93969, 4);
        expect(drawables.scaleY).toBeCloseTo(0.93969, 4);
        expect(drawables.shearX).toBeCloseTo(-0.34202, 4);
        expect(drawables.shearY).toBeCloseTo(0.34202, 4);
        expect(drawables.translateX).toBe(0);
        expect(drawables.translateY).toBe(0);
    });
});
