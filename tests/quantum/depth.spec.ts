import { ImageMagick } from '../../src/image-magick';
import { Quantum } from '../../src/quantum';

beforeAll(() => { ImageMagick.api = (global as any).native; });

describe('Quantum#depth', () => {
    it('should return the correct value', () => {
        expect(Quantum.depth).toEqual(8);
    }); 
});