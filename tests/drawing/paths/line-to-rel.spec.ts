/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IPath } from '@src/drawing/path';
import { PathLineToRel } from '@src/drawing/paths/path-line-to-rel';
import { Paths } from '@src/drawing/paths';

describe('Drawables#lineToRel', () => {
    it('should add the path', () => {
        const drawables = new Paths()
            .lineToRel(1, 2);

        const path = (drawables as unknown as { _paths: IPath[] })._paths[0];
        expect(path).toBeInstanceOf(PathLineToRel);

        const pathLineToRel = path as PathLineToRel;
        expect(pathLineToRel.x).toBe(1);
        expect(pathLineToRel.y).toBe(2);
    });
});
