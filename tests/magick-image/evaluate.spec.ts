// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '../../src/channels';
import { EvaluateOperator } from '../../src/evaluate-operator';
import { ImageMagick } from '../../src/image-magick';
import { MagickColor } from '../../src/magick-color';
import { MagickColors } from '../../src/magick-colors';
import { MagickGeometry } from '../../src/magick-geometry';
import { Quantum } from '../../src/quantum';
import { TestImages } from '../test-images';

describe('MagickImage#evaluate', () => {
    it('should throw error when geometry is percentage', () => {
        TestImages.Color.red.use(image => {
            expect(() => {
                image.evaluate(Channels.Composite, new MagickGeometry('10%'), EvaluateOperator.Set, 1);
            }).toThrowError('percentage is not supported');
        });
    });

    it('should change the specified channels', () => {
        TestImages.Builtin.logo.use(image => {
            image.evaluate(Channels.Red, new MagickGeometry(0, 0, 100, 295), EvaluateOperator.Set, 0);
            expect(image).toHavePixelWithColor(99, 195, new MagickColor('#00ffffff'));

            image.evaluate(Channels.Green, EvaluateOperator.Set, 0);
            expect(image).toHavePixelWithColor(99, 195, new MagickColor('#0000ffff'));
        });
    });

    it('should use the write mask', () => {
        TestImages.empty.use(image => {
            image.read(MagickColors.Black, 2, 1);

            ImageMagick.read(MagickColors.White, 2, 1, mask => {
                mask.getPixels(pixels => {
                    pixels.setPixel(0, 0, [0, 0, 0]);
                });

                image.setWriteMask(mask);
                image.evaluate(Channels.Red, EvaluateOperator.Set, Quantum.max);

                expect(image).toHavePixelWithColor(0, 0, MagickColors.Red);
                expect(image).toHavePixelWithColor(1, 0, MagickColors.Black);
            });
        });
    });
});
