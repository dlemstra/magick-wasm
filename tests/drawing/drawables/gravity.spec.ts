/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { Gravity } from '@src/enums/gravity';
import { DrawableGravity } from '@src/drawing/drawable-gravity';

describe('Drawables#gravity', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .gravity(Gravity.Center);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableGravity);

        const drawableFillColor = drawable as DrawableGravity;
        expect(drawableFillColor.gravity).toBe(Gravity.Center);
    });
});
