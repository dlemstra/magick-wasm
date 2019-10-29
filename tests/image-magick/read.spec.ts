import { ImageMagick } from '../../src/image-magick';

let imageMagick: ImageMagick;

beforeAll(() => {
    imageMagick = new ImageMagick((global as any).native);
});

describe('ImageMagick#read', () => {
    it('should read built-in image', async () => {
        await imageMagick.read('logo:', async (image) => {
            expect(image.width).toEqual(640);
            expect(image.height).toEqual(480);
        });
    });
});
