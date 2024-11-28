/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#comment', () => {
    it('should have null as default value', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            expect(image.comment).toBeNull();
        });
    });

    it('should set the comment attribute', () => {
        TestFiles.Images.empty.use(image => {
            image.comment = 'foo';
            expect(image.comment).toBe('foo');
            expect(image.getAttribute('comment')).toBe('foo');
        });
    });
});
