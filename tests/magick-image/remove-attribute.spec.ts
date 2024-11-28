/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#removeAttribute', () => {
    it('should remove the attribute from the image', () => {
        TestFiles.Images.empty.use((image) => {
            image.setAttribute('foo', 'bar');

            image.removeAttribute('foo');

            const value = image.getAttribute('foo');
            expect(value).toBeNull();
        });
    });
});
