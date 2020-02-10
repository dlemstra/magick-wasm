import { nativeApi } from '../../src/image-magick';
import { Quantum } from '../../src/quantum';

beforeAll(() => { nativeApi((global as any).native); });

describe('Quantum#depth', () => {
    it('should return the correct value', () => {
        expect(Quantum.depth).toEqual(8);
    }); 
});