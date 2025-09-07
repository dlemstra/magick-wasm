/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { IDrawable } from '@src/drawing/drawable';
import { IPath } from '@src/drawing/path';

describe('Drawables#paths', () => {
    it('should return an empty path instance where drawables is set', () => {
        const drawables = new Drawables()
        const paths = drawables.paths();

        const pathsWithPrivates = (paths as unknown as { _paths: IPath[], _drawables?: IDrawable });
        expect(pathsWithPrivates._paths.length).toBe(0);
        expect(pathsWithPrivates._drawables).toStrictEqual(drawables);
    });
});
