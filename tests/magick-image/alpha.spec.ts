import { AlphaOption } from '../../src/alpha-option';
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

describe('MagickImage#alpha', () => {
    it('should enable alpha channel', () => {
        image.read('logo:');
        image.alpha(AlphaOption.On);
        expect(image.channelCount).toEqual(5);
    });
});