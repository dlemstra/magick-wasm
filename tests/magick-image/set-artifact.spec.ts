// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '@test/test-images';

describe('MagickImage#setArtifact', () => {
    it('should change boolean to string', () => {
        TestImages.empty.use((image) => {
            image.setArtifact('foo', true);

            const value = image.getArtifact('foo');
            expect(value).toBe('1');
        });
    });

    it('should set the value', () => {
        TestImages.empty.use((image) => {
            image.setArtifact('foo', 'bar');

            const value = image.getArtifact('foo');
            expect(value).toBe('bar');
        });
    });
});
