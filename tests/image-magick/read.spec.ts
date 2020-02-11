import { ImageMagick } from '../../src/image-magick';

beforeAll(() => { ImageMagick.api = (global as any).native; });

describe('ImageMagick#read', () => {
    it('should read built-in image async', async () => {
        await ImageMagick.read('logo:', async (image) => {
            expect(image.width).toEqual(640);
            expect(image.height).toEqual(480);
        });
    });

    it('should read built-in image', () => {
        ImageMagick.read('wizard:', (image) => {
            expect(image.width).toEqual(480);
            expect(image.height).toEqual(640);
        });
    });
});
