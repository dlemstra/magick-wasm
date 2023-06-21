// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickFormat } from '../../src/magick-format';
import { MagickFormatInfo } from '../../src/magick-format-info';

describe('MagickFormatInfo#all', () => {
    it('should have a format for all values', () => {
        MagickFormatInfo.all.forEach(formatInfo => {
            try {
                expect(formatInfo.format).not.toBe(MagickFormat.Unknown);
            } catch (err) {
                console.error(`Missing Magickformat for: ${formatInfo.description}.`);
                throw (err);
            }
        });
    });

    it('should set all the descriptions', () => {
        MagickFormatInfo.all.forEach(formatInfo => {
            expect(formatInfo.description).not.toBeNull();
        });
    });

    it('should set supportsMultipleFrames to the correct value', () => {
        let index = MagickFormatInfo.all.findIndex(formatInfo => formatInfo.format === MagickFormat.Tiff);
        expect(index).toBeGreaterThan(-1);

        const tiffFormat = MagickFormatInfo.all[index];
        expect(tiffFormat.supportsMultipleFrames).toBe(true);

        index = MagickFormatInfo.all.findIndex(formatInfo => formatInfo.format === MagickFormat.Jpeg);
        expect(index).toBeGreaterThan(-1);

        const jpegFormat = MagickFormatInfo.all[index];
        expect(jpegFormat.supportsMultipleFrames).toBe(false);
    });

    it('should set supportsReading to the correct value', () => {
        let index = MagickFormatInfo.all.findIndex(formatInfo => formatInfo.format === MagickFormat.Jpeg);
        expect(index).toBeGreaterThan(-1);

        const jpegFormat = MagickFormatInfo.all[index];
        expect(jpegFormat.supportsReading).toBe(true);

        index = MagickFormatInfo.all.findIndex(formatInfo => formatInfo.format === MagickFormat.Info);
        expect(index).toBeGreaterThan(-1);

        const infoFormat = MagickFormatInfo.all[index];
        expect(infoFormat.supportsReading).toBe(false);
    });

    it('should set isWritable to the correct value', () => {
        let index = MagickFormatInfo.all.findIndex(formatInfo => formatInfo.format === MagickFormat.Jpeg);
        expect(index).toBeGreaterThan(-1);

        const jpegFormat = MagickFormatInfo.all[index];
        expect(jpegFormat.supportsWriting).toBe(true);

        index = MagickFormatInfo.all.findIndex(formatInfo => formatInfo.format === MagickFormat.Dng);
        expect(index).toBeGreaterThan(-1);

        const dngFormat = MagickFormatInfo.all[index];
        expect(dngFormat.supportsWriting).toBe(false);
    });
});
