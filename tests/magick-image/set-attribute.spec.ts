/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#setAttribute', () => {
    it('should set the value', () => {
        TestFiles.Images.empty.use((image) => {
            image.setAttribute('foo', 'bar');

            const value = image.getAttribute('foo');
            expect(value).toBe('bar');
        });
    });
});
