import { nativeApi } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';

beforeEach(() => {
    nativeApi((global as any).native);
});

describe('MagickImage#dispose', () => {
    it('should dispose the image', () => {
        const image = new MagickImage();
        image.dispose();
        expect(() => {
            image.resize(1, 1);
        }).toThrowError('image is disposed');
    });
});