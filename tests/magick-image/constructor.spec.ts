import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';

let image: MagickImage;

beforeEach(() => {
    ImageMagick.api = (global as any).native;
    image = new MagickImage();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#constructor', () => {
    it('should set the instance as unitialized', () => {
        expect(() => {
            image.resize(1, 1);
        }).toThrowError('no image has been read');
    });
});