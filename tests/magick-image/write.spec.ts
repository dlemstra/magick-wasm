// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickFormat } from '../../src/magick-format';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#write', () => {
    it('should save the image to an array async', async () => {
        image.read('wizard:');
        await image.write(async data => {
            expect(data.length).toBe(80796);
        }, MagickFormat.Jpeg);
    });

    it('should save the image to an array', () => {
        image.read('logo:');
        image.write(data => {
            expect(data.length).toBe(27450);
        }, MagickFormat.Png);
    });
});
