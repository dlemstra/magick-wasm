/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickFormat } from '@src/enums/magick-format';
import { Magick } from '@src/magick';

describe('Magick#supportedFormats', () => {
    it('should have a format for all values', () => {
        Magick.supportedFormats.forEach(formatInfo => {
            expect(formatInfo.format).toNotBeUnknown(`Missing MagickFormat for: ${formatInfo.description}.`);
        });
    });

    it('should set all the descriptions', () => {
        Magick.supportedFormats.forEach(formatInfo => {
            expect(formatInfo.description).not.toBeNull();
        });
    });

    it('should set supportsMultipleFrames to the correct value', () => {
        let index = Magick.supportedFormats.findIndex(formatInfo => formatInfo.format === MagickFormat.Tiff);
        expect(index).toBeGreaterThan(-1);

        const tiffFormat = Magick.supportedFormats[index];
        expect(tiffFormat.supportsMultipleFrames).toBe(true);

        index = Magick.supportedFormats.findIndex(formatInfo => formatInfo.format === MagickFormat.Jpeg);
        expect(index).toBeGreaterThan(-1);

        const jpegFormat = Magick.supportedFormats[index];
        expect(jpegFormat.supportsMultipleFrames).toBe(false);
    });

    it('should set supportsReading to the correct value', () => {
        let index = Magick.supportedFormats.findIndex(formatInfo => formatInfo.format === MagickFormat.Jpeg);
        expect(index).toBeGreaterThan(-1);

        const jpegFormat = Magick.supportedFormats[index];
        expect(jpegFormat.supportsReading).toBe(true);

        index = Magick.supportedFormats.findIndex(formatInfo => formatInfo.format === MagickFormat.Info);
        expect(index).toBeGreaterThan(-1);

        const infoFormat = Magick.supportedFormats[index];
        expect(infoFormat.supportsReading).toBe(false);
    });

    it('should set isWritable to the correct value', () => {
        let index = Magick.supportedFormats.findIndex(formatInfo => formatInfo.format === MagickFormat.Jpeg);
        expect(index).toBeGreaterThan(-1);

        const jpegFormat = Magick.supportedFormats[index];
        expect(jpegFormat.supportsWriting).toBe(true);

        index = Magick.supportedFormats.findIndex(formatInfo => formatInfo.format === MagickFormat.Dng);
        expect(index).toBeGreaterThan(-1);

        const dngFormat = Magick.supportedFormats[index];
        expect(dngFormat.supportsWriting).toBe(false);
    });
});
