// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickColors } from '../../src/magick-colors';
import { TestImages } from '../test-images';

describe('MagickImage#boundingBox', () => {
    it('should return the correct rectangle', () => {
        TestImages.Builtin.wizard.use(image => {
            let rectangle = image.boundingBox;

            rectangle = expectToNotBeNull(rectangle);
            expect(rectangle.width).toBe(480);
            expect(rectangle.height).toBe(629);
            expect(rectangle.x).toBe(0);
            expect(rectangle.y).toBe(11);
        });
    });

    it('should return null when there is no bounding box', async () => {
        TestImages.Builtin.wizard.use(image => {
            image.inverseOpaque(MagickColors.Purple, MagickColors.Black);

            const rectangle = image.boundingBox;

            expect(rectangle).toBeNull();
        });
    });
});
