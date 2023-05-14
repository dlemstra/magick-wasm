// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColors } from '../../src/magick-colors';
import { TestImages } from '../test-images';

let image: IMagickImage;

beforeEach(() => {
    image = MagickImage.create();
    image.read(MagickColors.White, 5, 5);
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#strip', () => {
    it('should remove the properties', () => {
        ImageMagick.read('wizard:', image => {
            image.comment = 'foo';

            expect(image.comment).toBe('foo');
            expect(image.getAttribute('date:create')).not.toBeNull();
            expect(image.getAttribute('date:modify')).not.toBeNull();
            expect(image.getAttribute('date:timestamp')).not.toBeNull();

            image.strip();

            expect(image.comment).toBeNull();
            expect(image.getAttribute('date:create')).toBeNull();
            expect(image.getAttribute('date:modify')).toBeNull();
            expect(image.getAttribute('date:timestamp')).toBeNull();
        });
    });

    it('should remove the profiles', async () => {
        await TestImages.fujiFilmFinePixS1ProJpg.read(image => {
            expect(image.getProfile('icc')).not.toBeNull();

            image.strip();

            expect(image.getProfile('icc')).toBeNull();
        });
    });
});
