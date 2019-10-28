import { MagickImage } from '../../src/magick-image';

describe('MagickImage#dispose', () => {
    it('should dispose the image', () => {
        const image = MagickImage.createImage((global as any).native);
        image.dispose();
        expect(() => {
            image.resize(1, 1);
        }).toThrowError('image is disposed');
    });
});