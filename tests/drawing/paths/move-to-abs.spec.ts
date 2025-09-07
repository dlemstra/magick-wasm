/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IPath } from '@src/drawing/path';
import { PathMoveToAbs } from '@src/drawing/paths/path-move-to-abs';
import { Paths } from '@src/drawing/paths';

describe('Drawables#moveToAbs', () => {
    it('should add the path', () => {
        const drawables = new Paths()
            .moveToAbs(1, 2);

        const path = (drawables as unknown as { _paths: IPath[] })._paths[0];
        expect(path).toBeInstanceOf(PathMoveToAbs);

        const pathMoveToAbs = path as PathMoveToAbs;
        expect(pathMoveToAbs.x).toBe(1);
        expect(pathMoveToAbs.y).toBe(2);
    });
});
