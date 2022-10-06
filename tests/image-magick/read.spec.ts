// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { MagickReadSettings } from '../../src/settings/magick-read-settings';
import { TestFiles } from '../test-files';
import '../custom-matcher';

beforeAll(() => { ImageMagick._api = global.native; });

describe('ImageMagick#read', () => {
    it('should read built-in image async', async () => {
        await ImageMagick.read('logo:', image => {
            expect(image.width).toBe(640);
            expect(image.height).toBe(480);
        });
    });

    it('should read built-in image', () => {
        ImageMagick.read('wizard:', image => {
            expect(image.width).toBe(480);
            expect(image.height).toBe(640);
        });
    });

    it('should read image from array async', async () => {
        const data = await TestFiles.imageMagickJpg.toBuffer();
        await ImageMagick.read(data, image => {
            expect(image.width).toBe(123);
            expect(image.height).toBe(118);
        });
    });

    it('should read image from array', () => {
        const data = TestFiles.imageMagickJpg.toBufferSync();
        ImageMagick.read(data, image => {
            expect(image.width).toBe(123);
            expect(image.height).toBe(118);
        });
    });

    it('should read correct image when width and height are specified', () => {
        const settings = new MagickReadSettings({
            width: 2,
            height: 3,
        });

        ImageMagick.read('xc:red', settings, image => {
            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
        });
    });

    it('should read correct image when width and height are specified async', async () => {
        const settings = new MagickReadSettings({
            width: 2,
            height: 3,
        });

        await ImageMagick.read('xc:red', settings, image => {
            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
        });
    });

    it('should read correct image when color is specified', () => {
        ImageMagick.read(MagickColors.Lime, 1, 2, image => {
            expect(image.width).toBe(1);
            expect(image.height).toBe(2);
            expect(image).toHavePixelWithColor(0, 1, MagickColors.Lime);
        });
    });

    it('should read correct image when color is specified async', async () => {
        await ImageMagick.read(MagickColors.Lime, 1, 2, image => {
            expect(image.width).toBe(1);
            expect(image.height).toBe(2);
            expect(image).toHavePixelWithColor(0, 1, MagickColors.Lime);
        });
    });
});
