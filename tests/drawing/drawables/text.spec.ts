/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { DrawableText } from '@src/drawing/drawable-text';

describe('Drawables#text', () => {
    it('should add the drawable', () => {
        const drawables = new Drawables()
            .text(4, 2, 'foobar');

        const drawable = (drawables as unknown as { _drawables: IDrawable[] })._drawables[0];
        expect(drawable).toBeInstanceOf(DrawableText);

        const drawableText = drawable as DrawableText;
        expect(drawableText.x).toBe(4);
        expect(drawableText.y).toBe(2);
        expect(drawableText.value).toBe('foobar');
    });
});
