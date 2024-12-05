/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorProfile } from '@src/profiles/color/color-profile';

describe('ColorProfile#constructor', () => {
    it('should use icc as the default name', () => {
        const colorProfile = new ColorProfile(new Uint8Array(0));
        expect(colorProfile.name).toBe('icc');
    });
});
