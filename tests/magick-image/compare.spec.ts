// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '../../src/channels';
import { ErrorMetric } from '../../src/error-metric';
import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { MagickImage } from '../../src/magick-image';

let image: MagickImage;
let other: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    other = MagickImage.create();
});

afterEach(() => {
    image.dispose();
    other.dispose();
});

describe('MagickImage#compare', () => {
    it('should return 0 for same image', () => {
        image.read(MagickColors.Red, 1, 1);
        expect(image.compare(image, ErrorMetric.RootMeanSquared)).toBe(0);
    });

    it('should return difference', () => {
        image.read(MagickColors.Red, 1, 1);
        other.read(MagickColors.RosyBrown, 1, 1);
        expect(image.compare(other, ErrorMetric.RootMeanSquared)).toBeCloseTo(0.48);
    });

    it('should compare the specified channels', () => {
        image.read(MagickColors.Red, 1, 1);
        other.read(MagickColors.RosyBrown, 1, 1);
        expect(image.compare(other, ErrorMetric.RootMeanSquared, Channels.Red)).toBeCloseTo(0.15);
    });
});