// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableText } from "../../src/drawables/drawable-text";
import { DrawableInterlineSpacing } from "../../src/drawables/drawable-interline-spacing";
import { DrawableFillColor } from "../../src/drawables/drawable-fill-color";
import { DrawableFont } from "../../src/drawables/drawable-font";
import { DrawableFontPointSize } from "../../src/drawables/drawable-font-point-size";
import { MagickColor } from "../../src/magick-color";
import { TestFonts } from "../test-fonts";
import { TestImages } from "../test-images";

describe("DrawableInterlineSpacing", () => {
    it("should write text with increased interline spacing", () => {
        TestImages.emptyCanvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(50),
                new DrawableInterlineSpacing(10),
                new DrawableFillColor(new MagickColor("pink")),
                new DrawableText(50, 50, "I\nI"),
            ]);

            expect(image).toHavePixelWithColor(60, 131, "#ffc0cbff");
        });
    });

    it("should write text with default interline spacing", () => {
        TestImages.emptyCanvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(50),
                new DrawableFillColor(new MagickColor("pink")),
                new DrawableText(50, 50, "I\nI"),
            ]);

            expect(image).toHavePixelWithColor(60, 131, "#ffffffff");
        });
    });

    it("should write text with decreased interline spacing", () => {
        TestImages.emptyCanvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(50),
                new DrawableInterlineSpacing(-20),
                new DrawableFillColor(new MagickColor("pink")),
                new DrawableText(50, 50, "I\nI"),
            ]);

            expect(image).toHavePixelWithColor(68, 87, "#ffc0cbff");
        });
    });
});
