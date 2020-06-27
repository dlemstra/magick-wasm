/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { TestFiles } from '../test-files';
import * as fs from "fs";
import { MagickReadSettings } from '../../src/settings/magick-read-settings';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = new MagickImage();
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

    it('should read image with width and height specified', () => {
        const settings = new MagickReadSettings();
        settings.width = 2;
        settings.height = 3;

        image.read('xc:red', settings);
        expect(image.width).toBe(2);
        expect(image.height).toBe(3);
    });

    it('should read image with height specified', () => {
        const settings = new MagickReadSettings();
        settings.width = 2;

        image.read('xc:red', settings);
        expect(image.width).toBe(2);
        expect(image.height).toBe(1);
    });

    it('should read image with width specified', () => {
        const settings = new MagickReadSettings();
        settings.height = 2;

        image.read('xc:red', settings);
        expect(image.width).toBe(1);
        expect(image.height).toBe(2);
    });
});