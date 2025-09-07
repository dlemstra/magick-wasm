/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableColor } from '@src/drawing/drawable-color';
import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { PaintMethod } from '@src/enums/paint-method';

describe('Drawables#color', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .color(1, 2, PaintMethod.Floodfill);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableColor);

        const drawableColor = drawable as DrawableColor;
        expect(drawableColor.x).toBe(1);
        expect(drawableColor.y).toBe(2);
        expect(drawableColor.paintMethod).toBe(PaintMethod.Floodfill);
    });
});
