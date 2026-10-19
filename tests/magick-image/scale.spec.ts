/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';

describe('MagickImage#scale', () => {
    it('should change the image size', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.scale(400, 200);

            expect(image.width).toBe(267);
            expect(image.height).toBe(200);
        });
    });

    it('should preserve the aspect ratio with geometry', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.scale(new MagickGeometry(300, 0));

            expect(image.width).toBe(300);
            expect(image.height).toBe(225);
        });
    });
});
