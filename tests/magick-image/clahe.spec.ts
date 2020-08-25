/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ErrorMetric } from '../../src/error-metric';
import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { Percentage } from '../../src/percentage';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#clache', () => {
    it('should change pixels of the image', () => {
        image.clone(clone => {
            clone.clahe(50, 100, 128, 3);
            const difference = clone.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBeCloseTo(0.017);
        });
    });

    it('should change pixels of the image with a percentage', () => {
        image.clone(clone => {
            clone.clahe(new Percentage(50), new Percentage(10), 128, 3);
            const difference = clone.compare(image, ErrorMetric.RootMeanSquared);
            expect(difference).toBeCloseTo(0.012);
        });
    });
});