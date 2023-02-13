// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableText } from '../../src/drawables/drawable-text';
import { DrawableFillColor } from '../../src/drawables/drawable-fill-color';
import { DrawableFont } from '../../src/drawables/drawable-font';
import { DrawableFontPointSize } from '../../src/drawables/drawable-font-point-size';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { Magick } from '../../src/magick';
import { MagickColor } from '../../src/magick-color';
import { MagickColors } from '../../src/magick-colors';
import { TestFiles } from '../test-files';
import '../custom-matcher';

let image: IMagickImage;

beforeAll(() => { ImageMagick._api = global.native; });

beforeEach(() => {
    image = MagickImage.create();
    image.read(MagickColors.White, 76, 147);
});

afterEach(() => {
    image.dispose();
});

describe('DrawableText', () => {
    it('should write text to the image', () => {
        Magick.addFont('test', TestFiles.kaushanScriptRegularTtf.toBufferSync());

        image.draw([
            new DrawableFont('test'),
            new DrawableFontPointSize(100),
            new DrawableFillColor(new MagickColor('pink')),
            new DrawableText(0, 109, 'X'),
        ])

        expect(image).toHavePixelWithColor(44, 74, '#ffc0cbff');
    });
});
