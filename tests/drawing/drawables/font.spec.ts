/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFont } from '@src/drawing/drawable-font';
import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';

describe('Drawables#font', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .font('foobar');

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableFont);

        const drawableFillColor = drawable as DrawableFont;
        expect(drawableFillColor.font).toBe('foobar');
    });
});
