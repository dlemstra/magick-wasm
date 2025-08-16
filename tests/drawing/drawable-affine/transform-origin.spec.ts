/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableAffine } from '@src/drawing/drawable-affine';

describe('DrawableAffine#transformOrigin', () => {
    it('should set the properties to the correct values', () => {
        const drawables = new DrawableAffine(2, 3, 4, 5, 6, 7);

        drawables.transformOrigin(8, 9);

        expect(drawables.scaleX).toBe(2);
        expect(drawables.scaleY).toBe(3);
        expect(drawables.shearX).toBe(4);
        expect(drawables.shearY).toBe(5);
        expect(drawables.translateX).toBe(67);
        expect(drawables.translateY).toBe(66);
    });

    it('should set the properties to the correct values when using the default values', () => {
        const drawables = new DrawableAffine();

        drawables.transformOrigin(2, 4);

        expect(drawables.scaleX).toBe(1);
        expect(drawables.scaleY).toBe(1);
        expect(drawables.shearX).toBe(0);
        expect(drawables.shearY).toBe(0);
        expect(drawables.translateX).toBe(2);
        expect(drawables.translateY).toBe(4);
    });
});
