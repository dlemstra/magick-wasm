/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableAffine } from '@src/drawing/drawable-affine';

describe('DrawableAffine#transformScale', () => {
    it('should set the properties to the correct values', () => {
        const drawables = new DrawableAffine(2, 3, 4, 5, 6, 7);

        drawables.transformScale(8, 9);

        expect(drawables.scaleX).toBe(16);
        expect(drawables.scaleY).toBe(27);
        expect(drawables.shearX).toBe(32);
        expect(drawables.shearY).toBe(45);
        expect(drawables.translateX).toBe(6);
        expect(drawables.translateY).toBe(7);
    });

    it('should set the properties to the correct values when using the default values', () => {
        const drawables = new DrawableAffine();

        drawables.transformScale(2, 4);

        expect(drawables.scaleX).toBe(2);
        expect(drawables.scaleY).toBe(4);
        expect(drawables.shearX).toBe(0);
        expect(drawables.shearY).toBe(0);
        expect(drawables.translateX).toBe(0);
        expect(drawables.translateY).toBe(0);
    });
});
