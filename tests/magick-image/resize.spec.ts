/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';

describe('MagickImage#resize', () => {
    it('should change the width of the image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.resize(400, 0);
            expect(image.width).toBe(400);
            expect(image.height).toBe(300);
        });
    });

    it('should change the height of the image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.resize(0, 400);
            expect(image.width).toBe(533);
            expect(image.height).toBe(400);
        });
    });

    it('with geometry should change the width of the image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.resize(new MagickGeometry(300, 0));
            expect(image.width).toBe(300);
            expect(image.height).toBe(225);
        });
    });

    it('with geometry should change the height of the image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.resize(new MagickGeometry(0, 300));
            expect(image.width).toBe(400);
            expect(image.height).toBe(300);
        });
    });
});
