/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#floodFill', () => {
    it.skip('should floodfill pixels with the specified alpha channel at the specified position', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.hasAlpha = true;
            image.colorFuzz = new Percentage(42);

            image.floodFill(250, 400, 300);
        });
    });

    it('should floodfill pixels with the color at the specified position', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.floodFill(MagickColors.Purple, 400, 300);

            expect(image).toHavePixelWithColor(440, 360, MagickColors.Purple);
            expect(image).toHavePixelWithColor(443, 331, '#f3f4f4');
        });
    });

    it('should not floodfill pixels when the target color does not match', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.floodFill(MagickColors.Purple, 400, 300, MagickColors.Red);

            expect(image).toHavePixelWithColor(440, 360, '#ffffff');
            expect(image).toHavePixelWithColor(443, 331, '#f3f4f4');
        });
    });

    it('should floodfill pixels with the color when the target matches', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.floodFill(MagickColors.Purple, 400, 300, MagickColors.White);

            expect(image).toHavePixelWithColor(440, 360, MagickColors.Purple);
            expect(image).toHavePixelWithColor(443, 331, '#f3f4f4');
        });
    });

    it('should floodfill pixels with the image at the specified position', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            TestFiles.Images.Builtin.wizard.use(wizard => {
                image.floodFill(wizard, 400, 300);
            });

            expect(image).toHavePixelWithColor(425, 342, '#bbbcc4');
            expect(image).toHavePixelWithColor(443, 331, '#f3f4f4');
        });
    });

    it('should not floodfill pixels when the target color does not match', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            TestFiles.Images.Builtin.wizard.use(wizard => {
                image.floodFill(wizard, 400, 300, MagickColors.Red);
            });

            expect(image).toHavePixelWithColor(440, 360, '#ffffff');
            expect(image).toHavePixelWithColor(443, 331, '#f3f4f4');
        });
    });

    it('should floodfill pixels with the color when the target matches', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            TestFiles.Images.Builtin.wizard.use(wizard => {
                image.floodFill(wizard, 400, 300, MagickColors.White);
            });

            expect(image).toHavePixelWithColor(425, 342, '#bbbcc4');
            expect(image).toHavePixelWithColor(443, 331, '#f3f4f4');
        });
    });
});
