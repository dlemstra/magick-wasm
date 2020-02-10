import { nativeApi } from '../../src/image-magick';
import { Magick } from '../../src/magick';

beforeAll(() => { nativeApi((global as any).native); });

describe('Magick#features', () => {
    it('should return the correct features', () => {
        expect(Magick.features).toEqual('Cipher');
    }); 
});