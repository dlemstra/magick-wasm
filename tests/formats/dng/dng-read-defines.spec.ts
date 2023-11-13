// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DngInterpolation } from '@src/formats/dng/dng-interpolation';
import { DngOutputColor } from '@src/formats/dng/dng-output-color';
import { DngReadDefines } from '@src/formats/dng/dng-read-defines';
import { MagickFormat } from '@src/enums/magick-format';
import { MagickReadSettings } from '@src/settings/magick-read-settings';

describe('DngReadDefines', () => {
    it('constructor should not set any defines', () => {
        const readSettings = new MagickReadSettings();
        readSettings.setDefines(new DngReadDefines());

        expect(readSettings.getDefine(MagickFormat.Dng, 'use-camera-wb')).toBeNull();
        expect(readSettings.getDefine(MagickFormat.Dng, 'use-auto-wb')).toBeNull();
        expect(readSettings.getDefine(MagickFormat.Dng, 'no-auto-bright')).toBeNull();
        expect(readSettings.getDefine(MagickFormat.Dng, 'output-color')).toBeNull();
    });

    it('should set define when disable auto brightness has been set', () => {
        const readSettings = new MagickReadSettings();
        const dngReadDefines = new DngReadDefines();
        dngReadDefines.disableAutoBrightness = true;

        readSettings.setDefines(dngReadDefines);

        expect(readSettings.getDefine(MagickFormat.Dng, 'no-auto-bright')).toBe('true');
    });

    it('should set define when output interpolation quality has been set', () => {
        const readSettings = new MagickReadSettings();
        const dngReadDefines = new DngReadDefines();
        dngReadDefines.interpolationQuality = DngInterpolation.ModifiedAhd;

        readSettings.setDefines(dngReadDefines);

        expect(readSettings.getDefine(MagickFormat.Dng, 'interpolation-quality')).toBe('12');
    });

    it('should set define when output color has been set', () => {
        const readSettings = new MagickReadSettings();
        const dngReadDefines = new DngReadDefines();
        dngReadDefines.outputColor = DngOutputColor.KodakProPhotoRGB;

        readSettings.setDefines(dngReadDefines);

        expect(readSettings.getDefine(MagickFormat.Dng, 'output-color')).toBe('4');
    });

    it('should set define when use camera white balance has been set', () => {
        const readSettings = new MagickReadSettings();
        const dngReadDefines = new DngReadDefines();
        dngReadDefines.useCameraWhitebalance = true;

        readSettings.setDefines(dngReadDefines);

        expect(readSettings.getDefine(MagickFormat.Dng, 'use-camera-wb')).toBe('true');
    });

    it('should set define when use auto white balance has been set', () => {
        const readSettings = new MagickReadSettings();
        const dngReadDefines = new DngReadDefines();
        dngReadDefines.useAutoWhitebalance = true;

        readSettings.setDefines(dngReadDefines);

        expect(readSettings.getDefine(MagickFormat.Dng, 'use-auto-wb')).toBe('true');
    });
});
