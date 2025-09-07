/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { DrawableStrokeDashOffset } from '@src/drawing/drawable-stroke-dash-offset';

describe('Drawables#strokeDashOffset', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .strokeDashOffset(42);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableStrokeDashOffset);

        const drawableStrokeColor = drawable as DrawableStrokeDashOffset;
        expect(drawableStrokeColor.offset).toStrictEqual(42);
    });
});
