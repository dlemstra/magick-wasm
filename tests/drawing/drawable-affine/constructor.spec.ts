/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableAffine } from '@src/drawing/drawable-affine';

describe('DrawableAffine#constructor', () => {
    it('should set the properties to the default values', () => {
        const drawables = new DrawableAffine();

        expect(drawables.scaleX).toBe(1);
        expect(drawables.scaleY).toBe(1);
        expect(drawables.shearX).toBe(0);
        expect(drawables.shearY).toBe(0);
        expect(drawables.translateX).toBe(0);
        expect(drawables.translateY).toBe(0);
    });

    it('should set the properties to the specified values', () => {
        const drawables = new DrawableAffine(2, 3, 4, 5, 6, 7);

        expect(drawables.scaleX).toBe(2);
        expect(drawables.scaleY).toBe(3);
        expect(drawables.shearX).toBe(4);
        expect(drawables.shearY).toBe(5);
        expect(drawables.translateX).toBe(6);
        expect(drawables.translateY).toBe(7);
    });
});
