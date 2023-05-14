// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickImage } from '../../src/magick-image';

describe('MagickImage#dispose', () => {
    it('should dispose the image', () => {
        const image = MagickImage.create();
        image.dispose();
        expect(() => {
            image.resize(1, 1);
        }).toThrowError('instance is disposed');
    });
});
