// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Magick } from '../../src/magick';

describe('Magick#supportedFormats', () => {
    it('should return the supported formats', () => {
        const formats = Magick.supportedFormats;

        expect(formats).not.toBeNull();
        expect(formats.length).toBe(264);
    });
});
