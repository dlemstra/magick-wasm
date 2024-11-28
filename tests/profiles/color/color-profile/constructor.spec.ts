/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorProfile } from '@src/profiles/color/color-profile';

describe('ColorProfile#constructor', () => {
    it('should allow icm and icc as the name', () => {
        let colorProfile = new ColorProfile('icm', new Uint8Array(0));
        colorProfile = new ColorProfile('icc', new Uint8Array(0));
        expect(colorProfile.name).toBe('icc');
    });

    it('should not allow invalid color profile names', () => {
        expect(() => {
            new ColorProfile('foo', new Uint8Array(0));
        }).toThrowError('Invalid profile name: foo.');
    });

    it('should use icc as the default name', () => {
        const colorProfile = new ColorProfile(new Uint8Array(0));
        expect(colorProfile.name).toBe('icc');
    });
});
