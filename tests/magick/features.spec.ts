import { Magick } from '../../src/magick';

let magick : Magick;

beforeAll(() => {
    magick = Magick.create((<any>global).native);
});

describe('Magick#features', () => {
    it('should return the correct features', () => {
        expect(magick.features).toEqual('Cipher');
    }); 
});