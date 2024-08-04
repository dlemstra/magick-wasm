/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Drawables } from '@src/drawing/drawables';
import { TestFonts } from '@test/test-fonts';

describe('Drawables#fontTypeMetrics', () => {
    it('should return the font type metrics', () => {
        const drawables = new Drawables()
            .font(TestFonts.kaushanScriptRegularTtf.name)
            .fontPointSize(15);

        const typeMetric = drawables.fontTypeMetrics("magick-wasm")!;

        expect(typeMetric).not.toBeNull();
        expect(typeMetric.ascent).toBe(17);
        expect(typeMetric.descent).toBe(-6);
        expect(typeMetric.maxHorizontalAdvance).toBe(16);
        expect(typeMetric.textHeight).toBe(23);
        expect(typeMetric.textWidth).toBe(86);
        expect(typeMetric.underlinePosition).toBe(-1.425);
        expect(typeMetric.underlineThickness).toBe(0.705);
    });

    it('should not ignore the newlines', () => {
        const drawables = new Drawables()
            .font(TestFonts.kaushanScriptRegularTtf.name)
            .fontPointSize(15);

        const typeMetric = drawables.fontTypeMetrics("magick-wasm\ntest")!;

        expect(typeMetric.textHeight).toBe(46);
        expect(typeMetric.textWidth).toBe(86);
    });

    it('should ignore the newlines when specified', () => {
        const drawables = new Drawables()
            .font(TestFonts.kaushanScriptRegularTtf.name)
            .fontPointSize(15);

        const typeMetric = drawables.fontTypeMetrics("magick-wasm\ntest", true)!;

        expect(typeMetric.textHeight).toBe(22);
        expect(typeMetric.textWidth).toBe(114);
    });
});
