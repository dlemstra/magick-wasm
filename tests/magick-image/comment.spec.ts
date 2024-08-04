/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestImages } from '@test/test-images';

describe('MagickImage#comment', () => {
    it('should have null as default value', () => {
        TestImages.Builtin.logo.use(image => {
            expect(image.comment).toBeNull();
        });
    });

    it('should set the comment attribute', () => {
        TestImages.empty.use(image => {
            image.comment = 'foo';
            expect(image.comment).toBe('foo');
            expect(image.getAttribute('comment')).toBe('foo');
        });
    });
});
