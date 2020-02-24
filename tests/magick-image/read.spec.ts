import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import * as fs from "fs";

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = new MagickImage();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#read', () => {
    it('should read built-in image', () => {
        image.read('logo:');
        expect(image.width).toEqual(640);
        expect(image.height).toEqual(480);
    });

    it('should read image from array', () => {
        const data = fs.readFileSync('tests/images/ImageMagick.jpg');
        image.read(data);
        expect(image.width).toEqual(123);
        expect(image.height).toEqual(118);
    });
});