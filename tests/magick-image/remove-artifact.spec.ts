/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#removeArtifact', () => {
    it('should remove the artifact from the image', () => {
        TestFiles.Images.empty.use((image) => {
            image.setArtifact('foo', true);

            image.removeArtifact('foo');

            const value = image.getArtifact('foo');
            expect(value).toBeNull();
        });
    });
});
