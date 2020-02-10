import { Quantum } from '../../src/quantum';

let quantum: Quantum;

beforeAll(() => {
    quantum = Quantum.create((global as any).native);
});

describe('Quantum#depth', () => {
    it('should return the correct value', () => {
        expect(quantum.depth).toEqual(8);
    }); 
});