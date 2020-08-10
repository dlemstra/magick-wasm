/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#setArtifact', () => {
    it('should change boolean to string', () => {
        image.setArtifact('foo', true);

        const value = image.getArtifact('foo');
        expect(value).toBe('1');
    });

    it('should set the value', () => {
        image.setArtifact('foo', 'bar');

        const value = image.getArtifact('foo');
        expect(value).toBe('bar');
    });
});