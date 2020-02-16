import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = new MagickImage();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#channelCount', () => {
    it('should return the number of channels', () => {
        image.read('logo:');
        expect(image.channelCount).toEqual(4);
    });
});