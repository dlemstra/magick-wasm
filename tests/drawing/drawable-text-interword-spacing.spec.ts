/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFont } from '@src/drawing/drawable-font';
import { DrawableFontPointSize } from '@src/drawing/drawable-font-point-size';
import { DrawableText } from '@src/drawing/drawable-text';
import { DrawableTextInterwordSpacing } from '@src/drawing/drawable-text-interword-spacing';
import { TestFiles } from '@test/test-files';

describe('DrawableTextInterwordSpacing', () => {
    it('should write text with default interword spacing', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(50),
                new DrawableText(50, 50, 'I I'),
            ]);

            image.trim();

            expect(image.width).toBe(46);
            expect(image.height).toBe(42);
        });
    });

    it('should write text with increased interword spacing', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(50),
                new DrawableTextInterwordSpacing(40),
                new DrawableText(50, 50, 'I I'),
            ]);

            image.trim();

            expect(image.width).toBe(74);
            expect(image.height).toBe(42);
        });
    });

    it('should write text with negative interword spacing', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(50),
                new DrawableTextInterwordSpacing(-10),
                new DrawableText(50, 50, 'I I'),
            ]);

            image.trim();

            expect(image.width).toBe(24);
            expect(image.height).toBe(42);
        });
    });
});
