/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { KmeansSettings } from '@src/settings/kmeans-settings';
import { TestFiles } from '@test/test-files';

describe('MagickImage#kmeans', () => {
    it('should use the default settings', () => {
        const settings = new KmeansSettings();

        expect(settings.seedColors).toBeUndefined();
        expect(settings.numberColors).toBe(0);
        expect(settings.maxIterations).toBe(100);
        expect(settings.tolerance).toBe(0.01);
    });

    it('should reduce the number of colors', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            const settings = new KmeansSettings();
            settings.numberColors = 5;

            image.kmeans(settings);

            expect(image.totalColors).toBe(5);
        });
    });

    it('should use seed colors', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            const settings = new KmeansSettings();
            settings.seedColors = 'red;green;blue';
            settings.numberColors = 3;

            image.kmeans(settings);

            expect(image.totalColors).toBe(3);
            expect(image.artifactNames).not.toContain('kmeans:seed-colors');
        });
    });
});
