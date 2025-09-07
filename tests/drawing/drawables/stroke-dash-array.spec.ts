/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { DrawableStrokeDashArray } from '@src/drawing/drawable-stroke-dash-array';

describe('Drawables#strokeDashArray', () => {
    it('should add the drawable', () => {
        const values = [4, 2];
        const drawables = new Drawables()
            .strokeDashArray(values);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableStrokeDashArray);

        const drawableStrokeColor = drawable as DrawableStrokeDashArray;
        expect(drawableStrokeColor.dash).toStrictEqual(values);
    });
});
