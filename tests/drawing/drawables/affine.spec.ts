/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableAffine } from '@src/drawing/drawable-affine';
import { Drawables } from '@src/drawing/drawables';

describe('Drawables#affine', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .affine(1, 2, 3, 4, 5, 6);

        const drawable = (drawables as any)._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableAffine);

        const drawableAffine = drawable as DrawableAffine;
        expect(drawableAffine.scaleX).toBe(1);
        expect(drawableAffine.scaleY).toBe(2);
        expect(drawableAffine.shearX).toBe(3);
        expect(drawableAffine.shearY).toBe(4);
        expect(drawableAffine.translateX).toBe(5);
        expect(drawableAffine.translateY).toBe(6);
    });
});
