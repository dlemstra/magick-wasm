/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { IPath } from '@src/drawing/path';
import { PathLineToAbs } from '@src/drawing/paths/path-line-to-abs';
import { Paths } from '@src/drawing/paths';

describe('Drawables#lineToAbs', () => {
    it('should add the path', () => {
        const drawables = new Paths()
            .lineToAbs(1, 2);

        const path = (drawables as unknown as { _paths: IPath[] })._paths[0];
        expect(path).toBeInstanceOf(PathLineToAbs);

        const pathLineToAbs = path as PathLineToAbs;
        expect(pathLineToAbs.x).toBe(1);
        expect(pathLineToAbs.y).toBe(2);
    });
});
