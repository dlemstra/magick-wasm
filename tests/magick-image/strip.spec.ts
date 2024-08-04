/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestImages } from '@test/test-images';

describe('MagickImage#strip', () => {
    it('should remove the properties', () => {
        TestImages.Builtin.wizard.use(image => {
            image.comment = 'foo';

            expect(image.comment).toBe('foo');
            expect(image.getAttribute('date:create')).not.toBeNull();
            expect(image.getAttribute('date:modify')).not.toBeNull();
            expect(image.getAttribute('date:timestamp')).not.toBeNull();

            image.strip();

            expect(image.comment).toBeNull();
            expect(image.getAttribute('date:create')).toBeNull();
            expect(image.getAttribute('date:modify')).toBeNull();
            expect(image.getAttribute('date:timestamp')).toBeNull();
        });
    });

    it('should remove the profiles', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(image => {
            expect(image.getProfile('icc')).not.toBeNull();

            image.strip();

            expect(image.getProfile('icc')).toBeNull();
        });
    });
});
