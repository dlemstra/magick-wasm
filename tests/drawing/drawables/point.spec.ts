/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { DrawablePoint } from '@src/drawing/drawable-point';

describe('Drawables#point', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .point(1, 2);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawablePoint);

        const drawablePoint = drawable as DrawablePoint;
        expect(drawablePoint.x).toBe(1);
        expect(drawablePoint.y).toBe(2);
    });
});
