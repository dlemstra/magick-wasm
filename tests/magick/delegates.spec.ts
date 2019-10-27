import { Magick } from '../../src/magick';

let magick : Magick;

beforeAll(() => {
    magick = Magick.create((<any>global).native);
});

describe('Magick#delegates', () => {
    it('should return the delegates', () => {
        expect(magick.delegates).toEqual('freetype heic jng jp2 jpeg lcms png raw tiff webp xml zlib');
    }); 
});