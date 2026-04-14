/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { MagickColors } from '@src/magick-colors';
import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#shadow', () => {
    it('should use the background color for the shadow', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.backgroundColor = MagickColors.Purple;
            image.shadow();

            expect(image.width).toBe(642);
            expect(image.height).toBe(482);
            expect(image.page.x).toBe(4);
            expect(image.page.y).toBe(4);
            expect(image).toHavePixelWithColor(10, 10, '#800080cc');
            expect(image).toHavePixelWithColor(image.width - 10, 10, '#800080cc');
            expect(image).toHavePixelWithColor(image.width - 10, image.height - 10, '#800080cc');
            expect(image).toHavePixelWithColor(10, image.height - 10, '#800080cc');
        });
    });

    it('should use the correct default colors', () => {
        TestFiles.Images.Builtin.logo.use(first => {
            first.clone(second => {
                first.shadow();
                second.shadow(5, 5, 0.5, new Percentage(80));

                expect(first.width).toBe(second.width);
                expect(first.height).toBe(second.height);
                expect(first.page.x).toBe(second.page.x);
                expect(first.page.y).toBe(second.page.y);

                expect(first.compare(second, ErrorMetric.RootMeanSquared)).toBe(0);
            });
        });
    });

    it('should use the specfied color for the shadow', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.backgroundColor = MagickColors.Purple;
            image.shadow(15, 15, 2.5, new Percentage(20), MagickColors.Green);

            expect(image.width).toBe(650);
            expect(image.height).toBe(490);
            expect(image.page.x).toBe(10);
            expect(image.page.y).toBe(10);
            expect(image).toHavePixelWithColor(20, 20, '#00800033');
            expect(image).toHavePixelWithColor(image.width - 20, 20, '#00800033');
            expect(image).toHavePixelWithColor(image.width - 20, image.height - 20, '#00800033');
            expect(image).toHavePixelWithColor(20, image.height - 20, '#00800033');
        });
    });
});
