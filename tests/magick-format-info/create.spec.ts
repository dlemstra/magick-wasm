// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickFormat } from '../../src/magick-format';
import { MagickFormatInfo } from '../../src/magick-format-info';

beforeAll(() => { ImageMagick._api = (global as any).native; });

describe('MagickFormatInfo#create', () => {
    it('should return information for each format', () => {
        const formats = Object.values(MagickFormat);
        formats.forEach(format => {
            if (format === MagickFormat.Unknown)
                return;

            const formatInfo = MagickFormatInfo.create(format);
            expect(formatInfo.format).toBe(format);
        });
    });

    it('should throw error when format is unknown', () => {
        expect(() => {
            MagickFormatInfo.create(<MagickFormat>"FOOBAR");
        }).toThrowError('unable to get format info for FOOBAR');
    });
});
