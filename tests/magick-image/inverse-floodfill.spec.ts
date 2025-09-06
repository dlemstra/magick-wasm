/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#inverseFloodFill', () => {
    it('should floodfill pixels when the target color does not match', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.inverseFloodFill(MagickColors.Purple, 400, 300, MagickColors.Red);

            expect(image).toHavePixelWithColor(440, 360, MagickColors.Purple);
            expect(image).toHavePixelWithColor(443, 331, MagickColors.Purple);
            expect(image).toHavePixelWithColor(285, 60, MagickColors.White);
            expect(image).toHavePixelWithColor(342, 75, MagickColors.Red);
        });
    });

    it('should not floodfill pixels with the color when the target matches', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.inverseFloodFill(MagickColors.Purple, 400, 300, MagickColors.White);

            expect(image).toHavePixelWithColor(440, 360, '#ffffff');
            expect(image).toHavePixelWithColor(443, 331, '#f3f4f4');
        });
    });

    it('should floodfill pixels when the target color does not match', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            TestFiles.Images.Builtin.rose.use(wizard => {
                image.inverseFloodFill(wizard, 400, 300, MagickColors.Red);
            });

            expect(image).toHavePixelWithColor(440, 360, '#4f4846');
            expect(image).toHavePixelWithColor(443, 331, '#3e3d31');
            expect(image).toHavePixelWithColor(285, 60, MagickColors.White);
            expect(image).toHavePixelWithColor(342, 75, MagickColors.Red);
        });
    });

    it('should not floodfill pixels with the color when the target matches', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            TestFiles.Images.Builtin.wizard.use(wizard => {
                image.inverseFloodFill(wizard, 400, 300, MagickColors.White);
            });

            expect(image).toHavePixelWithColor(440, 360, '#ffffff');
            expect(image).toHavePixelWithColor(443, 331, '#f3f4f4');
        });
    });
});
