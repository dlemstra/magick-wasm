/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#label', () => {
    it('should have null as default value', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            expect(image.label).toBeNull();
        });
    });

    it('should set the label attribute', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.label = 'foo';
            expect(image.label).toBe('foo');
            expect(image.getAttribute('label')).toBe('foo');
        });
    });
});
