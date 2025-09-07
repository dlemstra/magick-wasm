/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFillRule } from '@src/drawing/drawable-fill-rule';
import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { FillRule } from '@src/enums/fill-rule';

describe('Drawables#fillColor', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .fillRule(FillRule.EvenOdd);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableFillRule);

        const drawableFillColor = drawable as DrawableFillRule;
        expect(drawableFillColor.fillRule).toBe(FillRule.EvenOdd);
    });
});
