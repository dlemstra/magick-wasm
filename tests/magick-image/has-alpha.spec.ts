/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { TestFiles } from '../test-files';
import * as fs from "fs";

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = new MagickImage();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#hasAlpha', () => {
    it('should return true when image has alpha channel', () => {
        const data = fs.readFileSync(TestFiles.redPng);
        image.read(data);
        expect(image.hasAlpha).toBe(true);
    });

    it('should should disable the alpha channel', () => {
        const data = fs.readFileSync(TestFiles.redPng);
        image.read(data);
        image.hasAlpha = false;

        expect(image.hasAlpha).toBe(false);
    });
});