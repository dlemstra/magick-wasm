/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { DrawableRectangle } from '@src/drawing/drawable-rectangle';

describe('Drawables#rectangle', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .rectangle(1, 2, 3, 4);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableRectangle);

        const drawableRectangle = drawable as DrawableRectangle;
        expect(drawableRectangle.upperLeftX).toBe(1);
        expect(drawableRectangle.upperLeftY).toBe(2);
        expect(drawableRectangle.lowerRightX).toBe(3);
        expect(drawableRectangle.lowerRightY).toBe(4);
    });
});
