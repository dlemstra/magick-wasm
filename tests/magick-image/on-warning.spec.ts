// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '@test/test-images';
import { MagickErrorSeverity } from '@src/enums/magick-error-severity';

describe('MagickImage#onWarning', () => {
    it('should be called when ImageMagick raises a warning.', () => {
        TestImages.Builtin.logo.use(image => {
            let warningRaised = false;
            image.onWarning = (event) => {
                expect(event.error.message).not.toBeUndefined();
                expect(event.error.severity).toBeLessThan(MagickErrorSeverity.Error);
                expect(event.error.relatedErrors.length).toBe(0);
                warningRaised = true;
            };

            image.ping(TestImages.warningJpg.data);

            expect(warningRaised).toBe(true);
        });
    });
});
