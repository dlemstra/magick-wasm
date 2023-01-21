// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableFillColor } from '../../src/drawables/drawable-fill-color';
import { DrawableFont } from '../../src/drawables/drawable-font';
import { DrawableFontPointSize } from '../../src/drawables/drawable-font-point-size';
import { DrawableGravity } from '../../src/drawables/drawable-gravity';
import { DrawableText } from '../../src/drawables/drawable-text';
import { Gravity } from '../../src/gravity';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { Magick } from '../../src/magick';
import { MagickColors } from '../../src/magick-colors';
import { TestFiles } from '../test-files';
import '../custom-matcher';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    Magick.addFont('test', TestFiles.kaushanScriptRegularTtf.toBufferSync());
    image = MagickImage.create();
    image.read(MagickColors.White, 50, 50);
});

afterEach(() => {
    image.dispose();
});

describe('DrawableGravity', () => {
    it.each([
        [Gravity.Northwest, 22, 4],
        [Gravity.North, 31, 4],
        [Gravity.Northeast, 40, 4],
        [Gravity.West, 22, 21],
        [Gravity.Center, 31, 21],
        [Gravity.East, 40, 21],
        [Gravity.Southwest, 22, 39],
        [Gravity.South, 31, 39],
        [Gravity.Southeast, 40, 39],
    ])('should draw text at the expected gravity %s', (gravity: Gravity, x: number, y: number) => {
        image.draw([
            new DrawableFillColor(MagickColors.Green),
            new DrawableGravity(gravity),
            new DrawableFont('test'),
            new DrawableFontPointSize(10),
            new DrawableText(0, 0, 'Magick'),
        ])

        // Check for the dot on the `i` at the expected position
        expect(image).toHavePixelWithColor(x, y, '#108810ff');
    });
});
