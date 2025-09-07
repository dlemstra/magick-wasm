/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFillOpacity } from '@src/drawing/drawable-fill-opacity';
import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { Percentage } from '@src/types/percentage';

describe('Drawables#fillOpacity', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .fillOpacity(new Percentage(42));

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableFillOpacity);

        const drawableFillColor = drawable as DrawableFillOpacity;
        expect(drawableFillColor.opacity.toDouble()).toBe(42);
    });
});
