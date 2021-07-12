// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickReadSettings } from '../../src/settings/magick-read-settings';
import { TestFiles } from '../test-files';
import * as fs from 'fs';
import * as util from 'util';
import { MagickFormat } from '../../src/magick-format';

beforeAll(() => { ImageMagick._api = (global as any).native; });

describe('ImageMagick#readCollection', () => {
    it('should read built-in image async', async () => {
        await ImageMagick.readCollection('logo:', async (images) => {
            expect(images.length).toBe(1);
            expect(images[0].width).toBe(640);
            expect(images[0].height).toBe(480);
        });
    });

    it('should read built-in image', () => {
        ImageMagick.readCollection('wizard:', (images) => {
            expect(images.length).toBe(1);
            expect(images[0].width).toBe(480);
            expect(images[0].height).toBe(640);
        });
    });

    it('should read image from array async', async () => {
        const readFile = util.promisify(fs.readFile);
        const data = await readFile(TestFiles.roseSparkleGif);
        await ImageMagick.readCollection(data, (images) => {
            expect(images.length).toBe(3);
            images.forEach(image => {
                expect(image.width).toBe(70);
                expect(image.height).toBe(46);
            });
        });
    });

    it('should read image from array', () => {
        const data = fs.readFileSync(TestFiles.roseSparkleGif);
        ImageMagick.readCollection(data, (images) => {
            expect(images.length).toBe(3);
            images.forEach(image => {
                expect(image.width).toBe(70);
                expect(image.height).toBe(46);
            });
        });
    });

    it('should read image from array with settings async', async () => {
        const settings = new MagickReadSettings(
        {
            format: MagickFormat.Png
        });

        const readFile = util.promisify(fs.readFile);
        const data = await readFile(TestFiles.roseSparkleGif);
        await expect(async () => {
            await ImageMagick.readCollection(data, settings, () => {
                // will never be reached
            });
        }).rejects.toThrowError('ImproperImageHeader');
    });

    it('should read image from array with settings', () => {
        const settings = new MagickReadSettings(
        {
            format: MagickFormat.Png
        });

        const data = fs.readFileSync(TestFiles.roseSparkleGif);
        expect(() => {
            ImageMagick.readCollection(data, settings, () => {
                // will never be reached
            });
        }).toThrowError('ImproperImageHeader');
    });
});
