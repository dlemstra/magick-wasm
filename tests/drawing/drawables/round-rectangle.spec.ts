/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { DrawableRoundRectangle } from '@src/drawing/drawable-round-rectangle';

describe('Drawables#roundRectangle', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .roundRectangle(1, 2, 3, 4, 5,6);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableRoundRectangle);

        const drawableRectangle = drawable as DrawableRoundRectangle;
        expect(drawableRectangle.upperLeftX).toBe(1);
        expect(drawableRectangle.upperLeftY).toBe(2);
        expect(drawableRectangle.lowerRightX).toBe(3);
        expect(drawableRectangle.lowerRightY).toBe(4);
        expect(drawableRectangle.cornerWidth).toBe(5);
        expect(drawableRectangle.cornerHeight).toBe(6);
    });
});
