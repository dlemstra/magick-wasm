/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Density } from '@src/types/density';
import { DensityUnit } from '@src/enums/density-unit';
import { FilterType } from '@src/enums/filter-type';
import { Point } from '@src/types/point';
import { TestFiles } from '@test/test-files';

describe('MagickImage#resample', () => {
    it('should resample the image with the specified resolutions', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.density = new Density(100, 100, DensityUnit.PixelsPerInch);
            image.resample(300, 150);

            expect(image.density.x).toBe(300);
            expect(image.density.y).toBe(150);
            expect(image.width).toBe(1920);
            expect(image.height).toBe(720);
        });
    });

    it('should use the specified filter', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.density = new Density(100, 100, DensityUnit.PixelsPerInch);
            image.clone(other => {
                image.filterType = FilterType.Point;
                image.resample(new Point(200, 200), FilterType.Box);

                other.filterType = FilterType.Box;
                other.resample(new Point(200, 200));

                expect(image.density.x).toBe(200);
                expect(image.density.y).toBe(200);
                expect(image.width).toBe(1280);
                expect(image.height).toBe(960);
                expect(image).toEqualImage(other);
            });
        });
    });
});
