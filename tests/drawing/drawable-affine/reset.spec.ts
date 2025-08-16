/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableAffine } from '@src/drawing/drawable-affine';

describe('DrawableAffine#reset', () => {
    it('should set the properties to the default values', () => {
        const drawables = new DrawableAffine(2, 3, 4, 5, 6, 7);

        drawables.reset();

        expect(drawables.scaleX).toBe(1);
        expect(drawables.scaleY).toBe(1);
        expect(drawables.shearX).toBe(0);
        expect(drawables.shearY).toBe(0);
        expect(drawables.translateX).toBe(0);
        expect(drawables.translateY).toBe(0);
    });
});
