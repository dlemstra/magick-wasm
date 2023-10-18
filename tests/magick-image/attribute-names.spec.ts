// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '@test/test-images';

describe('MagickImage#attributeNames', () => {
    it('should return empty array when image has not attributes', () => {
        TestImages.empty.use(image => {
            const names = image.attributeNames;

            expect(names).not.toBeNull();
            expect(names.length).toBe(0);
        });
    });

    it('should return the attributes names of the image', () => {
        TestImages.empty.use(image => {
            image.setAttribute('foo', 'bar');

            const names = image.attributeNames;

            expect(names).not.toBeNull();
            expect(names.length).toBe(1);
            expect(names[0]).toBe('foo');
        });
    });
});
