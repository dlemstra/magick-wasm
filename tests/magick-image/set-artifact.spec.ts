/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#setArtifact', () => {
    it('should change boolean to string', () => {
        TestFiles.Images.empty.use((image) => {
            image.setArtifact('foo', true);

            const value = image.getArtifact('foo');
            expect(value).toBe('1');
        });
    });

    it('should set the value', () => {
        TestFiles.Images.empty.use((image) => {
            image.setArtifact('foo', 'bar');

            const value = image.getArtifact('foo');
            expect(value).toBe('bar');
        });
    });
});
