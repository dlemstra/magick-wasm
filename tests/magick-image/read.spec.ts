/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { MagickImage } from '../../src/magick-image';
import { MagickReadSettings } from '../../src/settings/magick-read-settings';
import { TestFiles } from '../test-files';
import { pixelColor } from '../pixel-color';
import * as fs from "fs";

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#read', () => {
    it('should read built-in image', () => {
        image.read('logo:');
        expect(image.width).toBe(640);
        expect(image.height).toBe(480);
    });

    it('should read image from array', () => {
        const data = fs.readFileSync(TestFiles.imageMagickJpg);
        image.read(data);
        expect(image.width).toBe(123);
        expect(image.height).toBe(118);
    });

    it('should read correct image when width and height are specified', () => {
        const settings = new MagickReadSettings(
        {
            width: 2,
            height: 3
        });

        image.read('xc:red', settings);
        expect(image.width).toBe(2);
        expect(image.height).toBe(3);
    });

    it('should read correct image when height is specified', () => {
        const settings = new MagickReadSettings(
        {
            width: 2
        });

        image.read('xc:red', settings);
        expect(image.width).toBe(2);
        expect(image.height).toBe(1);
    });

    it('should read correct image when width is specified', () => {
        const settings = new MagickReadSettings(
        {
            height: 2
        });

        image.read('xc:red', settings);
        expect(image.width).toBe(1);
        expect(image.height).toBe(2);
    });

    it('should read correct image when color is specified', () => {
        image.read(MagickColors.Red, 1, 2);
        expect(image.width).toBe(1);
        expect(image.height).toBe(2);
        expect(pixelColor(image, 0, 1)).toBe('#ff0000ff');
    });
});