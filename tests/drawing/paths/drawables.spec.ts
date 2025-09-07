/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { Paths } from '@src/drawing/paths';

describe('Drawables#drawables', () => {
    it('should return new instance when drawables are undefined', () => {
        const paths = new Paths();

        expect(paths.drawables()).toBeInstanceOf(Drawables);
    });

    it('should return the drawables instance', () => {
        const drawables = new Drawables()
        const paths = new Paths(drawables);

        expect(paths.drawables()).toStrictEqual(drawables);
    });
});
