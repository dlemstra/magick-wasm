/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import {ImageMagick} from '../../src/image-magick'
import {MagickColors} from '../../src/magick-colors'
import {MagickImage} from '../../src/magick-image'
import {MagickReadSettings} from '../../src/settings/magick-read-settings'
import {TestFiles} from '../test-files'
import {colorAssert} from '../color-assert'
import * as fs from 'fs'
import {MagickFormat} from '../../src/magick-format'

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
        expect(image.hasAlpha).toBe(false);
        colorAssert(image, 0, 1, MagickColors.Red);
    });

    it('should read correct image when ...', () => {
        const settings = new MagickReadSettings(
        {
          width: 2,
            defines: {
              defines: [
                {
                    format: MagickFormat.Dng,
                    name: 'use-camera-wb',
                    value: '0'
                }
              ]
            }
        });

        const data = fs.readFileSync(TestFiles.redPng);
        image.read(data, settings);
        // expect(image.width).toBe(1);
        // expect(image.height).toBe(2);
        colorAssert(image, 0, 1, MagickColors.Red);
    });
});