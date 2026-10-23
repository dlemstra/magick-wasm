/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { AlphaAction } from '@src/enums/alpha-action';
import { PixelInterpolateMethod } from '@src/enums/pixel-interpolate-method';
import { TestFiles } from '@test/test-files';

describe('MagickImage#swirl', () => {
    it('should swirl the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.alpha(AlphaAction.Deactivate);

            expect(image).toHavePixelWithColor(287, 74, '#ff0000');
            expect(image).not.toHavePixelWithColor(363, 333, '#ffffff');

            image.swirl(60);

            expect(image.width).toBe(640);
            expect(image.height).toBe(480);
            expect(image).not.toHavePixelWithColor(287, 74, '#ff0000');
            expect(image).toHavePixelWithColor(363, 333, '#ffffff');
        });
    });

    it('should use the image interpolation method by default', () => {
        TestFiles.Images.Builtin.wizard.use(image => {
            image.interpolate = PixelInterpolateMethod.Blend;
            image.clone(other => {
                image.swirl(60);
                other.swirl(other.interpolate, 60);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should preserve the image with zero degrees', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(original => {
                image.swirl(PixelInterpolateMethod.Nearest, 0);

                expect(image).toEqualImage(original);
            });
        });
    });

    it('should swirl differently for positive and negative degrees', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(64, 48);
            image.clone(other => {
                image.swirl(60);
                other.swirl(-60);

                expect(image).toEqualImage(other, 0.18999);
            });
        });
    });

    it('should use the specified interpolation method', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(64, 48);
            image.clone(other => {
                image.swirl(PixelInterpolateMethod.Blend, 60);
                other.swirl(PixelInterpolateMethod.Nearest, 60);

                expect(image).toEqualImage(other, 0.04182);
            });
        });
    });
});
