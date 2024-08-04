/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestImages } from '@test/test-images';

describe('MagickImage#removeArtifact', () => {
    it('should remove the artifact from the image', () => {
        TestImages.empty.use((image) => {
            image.setArtifact('foo', true);

            image.removeArtifact('foo');

            const value = image.getArtifact('foo');
            expect(value).toBeNull();
        });
    });
});
