import { ImageMagick } from '../../src/image-magick';
import { Magick } from '../../src/magick';

beforeAll(() => { ImageMagick.api = (global as any).native; });

describe('Magick#delegates', () => {
    it('should return the delegates', () => {
        expect(Magick.delegates).toEqual('freetype heic jng jp2 jpeg lcms png raw tiff webp xml zlib');
    });
});