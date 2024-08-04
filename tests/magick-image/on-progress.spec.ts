/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Percentage } from '@src/types/percentage';
import { TestImages } from '@test/test-images';

describe('MagickImage#onProgress', () => {
    it('should stop executing when cancel is set to true', () => {
        TestImages.Builtin.logo.use(image => {
            let progress: Percentage | null = null;

            image.onProgress = (event) => {
                expect(event).not.toBeNull();
                expect(event.origin).not.toBeNull();
                expect(event.cancel).toBe(false);

                progress = event.progress;

                event.cancel = true;
            };

            image.flop();

            expect(progress).not.toBeNull();
            expect(progress!.toDouble()).toBeGreaterThanOrEqual(0);
            expect(progress!.toDouble()).toBeLessThan(2);
        });
    });

    it('should be set to undefined when the image is disposed.', () => {
        TestImages.Builtin.logo.use(image => {
            image.onProgress = (event) => {
                event.cancel = false;
            };

            expect(image.onProgress).not.toBeUndefined();

            image.dispose();

            expect(image.onProgress).toBeUndefined();
        });
    });
});
