/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Kernel } from '@src/enums/kernel';
import { MorphologyMethod } from '@src/enums/morphology-method';
import { MorphologySettings } from '@src/settings/morphology-settings';
import { TestFiles } from '@test/test-files';

describe('MagickImage#morphology', () => {
    it('should apply the kernel with the specified method', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            const settings = new MorphologySettings(MorphologyMethod.Dilate, Kernel.Octagon);
            settings.iterations = 3;
            image.morphology(settings);

            expect(image).toHavePixelWithColor(300, 215, '#f79868ff');
            expect(image).toHavePixelWithColor(420, 180, '#f5ee92ff');
            expect(image).toHavePixelWithColor(405, 435, '#ed3e92ff');
        });
    });

    it('should use the kernel arguments', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            const settings = new MorphologySettings(MorphologyMethod.Dilate, Kernel.Disk, '5.3');
            image.morphology(settings);

            expect(image).toHavePixelWithColor(300, 215, '#f79868ff');
            expect(image).toHavePixelWithColor(420, 180, '#f5ee92ff');
            expect(image).toHavePixelWithColor(405, 435, '#513e92ff');
        });
    });

    it('should support kernel as a string', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            const settings = new MorphologySettings(MorphologyMethod.Dilate, 'Disk');
            image.morphology(settings);

            expect(image).toHavePixelWithColor(300, 215, '#f79868ff');
            expect(image).toHavePixelWithColor(420, 180, '#f5ee92ff');
            expect(image).toHavePixelWithColor(405, 435, '#223e92ff');
        });
    });
});
