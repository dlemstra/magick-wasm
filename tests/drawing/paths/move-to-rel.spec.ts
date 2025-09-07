/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IPath } from '@src/drawing/path';
import { PathMoveToRel } from '@src/drawing/paths/path-move-to-rel';
import { Paths } from '@src/drawing/paths';

describe('Drawables#moveToRel', () => {
    it('should add the path', () => {
        const drawables = new Paths()
            .moveToRel(1, 2);

        const path = (drawables as unknown as { _paths: IPath[] })._paths[0];
        expect(path).toBeInstanceOf(PathMoveToRel);

        const pathMoveToRel = path as PathMoveToRel;
        expect(pathMoveToRel.x).toBe(1);
        expect(pathMoveToRel.y).toBe(2);
    });
});
