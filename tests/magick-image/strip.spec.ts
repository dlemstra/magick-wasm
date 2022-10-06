// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { TestFiles } from '../test-files';
import '../custom-matcher';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
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

    it('should remove the profiles', () => {
        TestFiles.fujiFilmFinePixS1ProJpg.read(image => {
            expect(image.getProfile('icc')).not.toBeNull();

            image.strip();

            expect(image.getProfile('icc')).toBeNull();
        });
    });
});
