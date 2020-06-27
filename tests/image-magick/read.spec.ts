/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickReadSettings } from '../../src/settings/magick-read-settings';
import { TestFiles } from '../test-files';
import * as fs from "fs";
import * as util from "util";

beforeAll(() => { ImageMagick._api = (global as any).native; });

describe('ImageMagick#read', () => {
    it('should read built-in image async', async () => {
        await ImageMagick.read('logo:', async (image) => {
            expect(image.width).toBe(640);
            expect(image.height).toBe(480);
        });
    });

    it('should read built-in image', () => {
        ImageMagick.read('wizard:', (image) => {
            expect(image.width).toBe(480);
            expect(image.height).toBe(640);
        });
    });

    it('should read image from array async', async () => {
        const readFile = util.promisify(fs.readFile);
        const data = await readFile(TestFiles.imageMagickJpg);
        await ImageMagick.read(data, (image) => {
            expect(image.width).toBe(123);
            expect(image.height).toBe(118);
        });
    });

    it('should read image from array', () => {
        const data = fs.readFileSync(TestFiles.imageMagickJpg);
        ImageMagick.read(data, (image) => {
            expect(image.width).toBe(123);
            expect(image.height).toBe(118);
        });
    });

    it('should read image with width and height specified', () => {
        const settings = new MagickReadSettings(
        {
            width: 2,
            height: 3
        });

        ImageMagick.read('xc:red', settings, (image) => {
            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
        });
    });

    it('should read image with width and height specified async', async () => {
        const settings = new MagickReadSettings(
        {
            width: 2,
            height: 3
        });

        await ImageMagick.read('xc:red', settings, (image) => {
            expect(image.width).toBe(2);
            expect(image.height).toBe(3);
        });
    });
});
