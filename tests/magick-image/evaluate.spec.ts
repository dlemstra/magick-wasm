// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '../../src/channels';
import { EvaluateOperator } from '../../src/evaluate-operator';
import { ImageMagick } from '../../src/image-magick';
import { MagickColor } from '../../src/magick-color';
import { MagickColors } from '../../src/magick-colors';
import { MagickGeometry } from '../../src/magick-geometry';
import { MagickImage } from '../../src/magick-image';
import { Quantum } from '../../src/quantum';
import { colorAssert } from '../color-assert';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#evaluate', () => {
    it('should throw error when geometry is percentage', () => {
        image.read(MagickColors.Red, 1, 1);

        expect(() => {
            image.evaluate(Channels.Composite, new MagickGeometry('10%'), EvaluateOperator.Set, 1);
        }).toThrowError('percentage is not supported');
    });

    it('should change the specified channels', () => {
        image.read('logo:');

        image.evaluate(Channels.Red, new MagickGeometry(0, 0, 100, 295), EvaluateOperator.Set, 0);
        colorAssert(image, 99, 195, new MagickColor('#00ffffff'));

        image.evaluate(Channels.Green, EvaluateOperator.Set, 0);
        colorAssert(image, 99, 195, new MagickColor('#0000ffff'));
    });

    it('should use the write mask', () => {
        image.read(MagickColors.Black, 2, 1);

        ImageMagick.read(MagickColors.White, 2, 1, mask => {
            mask.getPixels(pixels => {
                pixels.setPixel(0, 0, [ 0, 0, 0 ]);
            });

            image.setWriteMask(mask);
            image.evaluate(Channels.Red, EvaluateOperator.Set, Quantum.max);

            colorAssert(image, 0, 0, MagickColors.Red);
            colorAssert(image, 1, 0, MagickColors.Black);
        });
    });
});