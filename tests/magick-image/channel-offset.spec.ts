import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { PixelChannel } from '../../src/pixel-channel';

let image: MagickImage;

beforeEach(() => {
    ImageMagick.api = (global as any).native;
    image = new MagickImage();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#channelCount', () => {
    it('should return -1 when image does not contain channel', () => {
        expect(image.channelOffset(PixelChannel.Alpha)).toEqual(-1);
    });

    it('should return the index of the channel', () => {
        expect(image.channelOffset(PixelChannel.Red)).toEqual(0);
        expect(image.channelOffset(PixelChannel.Green)).toEqual(1);
        expect(image.channelOffset(PixelChannel.Blue)).toEqual(2);
        expect(image.channelOffset(PixelChannel.Index)).toEqual(3);
    });
});