/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { MagickReadSettings } from '../../src/settings/magick-read-settings';

beforeEach(() => { ImageMagick._api = (global as any).native; });

describe('MagickImage#setArtifact', () => {
    it('should change boolean to string', () => {
        const settings = new MagickReadSettings(
        {
            width: 1
        });

        const image = new MagickImage();
        image.setArtifact('foo', true);

        const value = image.getArtifact('foo');
        expect(value).toBe('1');
    });

    it('should set the value', () => {
        const settings = new MagickReadSettings(
        {
            width: 1
        });

        const image = new MagickImage();
        image.setArtifact('foo', 'bar');

        const value = image.getArtifact('foo');
        expect(value).toBe('bar');
    });
});