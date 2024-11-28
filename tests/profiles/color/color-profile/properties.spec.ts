/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '@src/enums/color-space';
import { TestFiles } from '@test/test-files';

describe('ColorProfile#properties', () => {
    it('should return the correct values for an sRGB profile', () => {
        const colorProfile = TestFiles.profiles.color.sRGB.load();

        expect(colorProfile.name).toBe('icc');
        expect(colorProfile.data.length).toBe(3144);
        expect(colorProfile.colorSpace).toBe(ColorSpace.sRGB);
        expect(colorProfile.copyright).toBe('Copyright (c) 1998 Hewlett-Packard Company');
        expect(colorProfile.description).toBe('sRGB IEC61966-2.1');
        expect(colorProfile.manufacturer).toBe('IEC http://www.iec.ch');
        expect(colorProfile.model).toBe('IEC 61966-2.1 Default RGB colour space - sRGB');
    });

    it('should return the correct values for an CMYK profile', () => {
        const colorProfile = TestFiles.profiles.color.USWebCoatedSWOP.load();

        expect(colorProfile.name).toBe('icc');
        expect(colorProfile.data.length).toBe(557168);
        expect(colorProfile.colorSpace).toBe(ColorSpace.CMYK);
        expect(colorProfile.copyright).toBe('Copyright 2000 Adobe Systems, Inc.');
        expect(colorProfile.description).toBe('U.S. Web Coated (SWOP) v2');
        expect(colorProfile.manufacturer).toBeNull();
        expect(colorProfile.model).toBeNull();
    });
});
