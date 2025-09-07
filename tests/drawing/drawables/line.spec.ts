/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { DrawableLine } from '@src/drawing/drawable-line';

describe('Drawables#line', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .line(1, 2, 3, 4);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableLine);

        const drawableLine = drawable as DrawableLine;
        expect(drawableLine.startX).toBe(1);
        expect(drawableLine.startY).toBe(2);
        expect(drawableLine.endX).toBe(3);
        expect(drawableLine.endY).toBe(4);
    });
});
