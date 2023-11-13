// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '@test/test-images';

describe('MagickImage#setAttribute', () => {
    it('should set the value', () => {
        TestImages.empty.use((image) => {
            image.setAttribute('foo', 'bar');

            const value = image.getAttribute('foo');
            expect(value).toBe('bar');
        });
    });
});
