import { ImageMagick } from '../../src/image-magick';

let imageMagick : ImageMagick;

beforeAll(() => {
    imageMagick = new ImageMagick((<any>global).native);
});

describe('ImageMagick#read', () => {
    it('should read built-in image', () => {
        imageMagick.read('logo:', (image) => {
            expect(image.width).toEqual(640);
            expect(image.height).toEqual(480);
        });
    }); 
});