/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickReadSettings } from '../../src/settings/magick-read-settings';

beforeEach(() => { ImageMagick._api = (global as any).native; });

describe('MagickImage#setArtifact', () => {
    it('should change boolean to string', () => {
        const settings = new MagickReadSettings(
        {
            width: 1
        });

        ImageMagick.read('xc:red', settings, (image) => {
            image.setArtifact('foo', true);

            const value = image.getArtifact('foo');
            expect(value).toBe('1');
        });
    });

    it('should set the value', () => {
        const settings = new MagickReadSettings(
        {
            width: 1
        });

        ImageMagick.read('xc:red', settings, (image) => {
            image.setArtifact('foo', 'bar');

            const value = image.getArtifact('foo');
            expect(value).toBe('bar');
        });
    });
});