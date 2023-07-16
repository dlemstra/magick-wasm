// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableFont } from "../../src/drawables/drawable-font";
import { DrawableFontPointSize } from "../../src/drawables/drawable-font-point-size";
import { DrawableText } from "../../src/drawables/drawable-text";
import { DrawableTextAntialias } from "../../src/drawables/drawable-text-antialias";
import { TestFonts } from "../test-fonts";
import { TestImages } from "../test-images";

describe("DrawableTextAntialias", () => {
    it("should write text with antialias to the image", () => {
        TestImages.emptyCanvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableText(0, 100, "Test"),
            ]);

            expect(image).toHavePixelWithColor(95, 67, "#b1b1b1ff");
        });
    });

    it("should write text without antialias to the image", () => {
        TestImages.emptyCanvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                DrawableTextAntialias.Disabled,
                new DrawableText(0, 100, "Test"),
            ]);

            expect(image).toHavePixelWithColor(95, 67, "#000000ff");
        });
    });
});
