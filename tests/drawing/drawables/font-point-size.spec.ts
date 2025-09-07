/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFontPointSize } from '@src/drawing/drawable-font-point-size';
import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';

describe('Drawables#fontPointSize', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .fontPointSize(42);

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableFontPointSize);

        const drawableFontPointSize = drawable as DrawableFontPointSize;
        expect(drawableFontPointSize.pointSize).toBe(42);
    });
});
