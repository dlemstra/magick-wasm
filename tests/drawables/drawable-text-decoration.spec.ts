// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableFont } from "../../src/drawables/drawable-font";
import { DrawableFontPointSize } from "../../src/drawables/drawable-font-point-size";
import { DrawableText } from "../../src/drawables/drawable-text";
import { DrawableTextDecoration } from "../../src/drawables/drawable-text-decoration";
import { TestFonts } from "../test-fonts";
import { TestImages } from "../test-images";
import { TextDecoration } from "../../src/text-decoration";

describe("DrawableTextDecoration", () => {
    it("should write text without decoration to the image", () => {
        TestImages.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableText(0, 100, "Test"),
            ]);

            expect(image).toHavePixelWithColor(88, 109, "#ffffffff");
        });
    });

    it("should write text with decoration to the image", () => {
        TestImages.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableTextDecoration(TextDecoration.Underline),
                new DrawableText(0, 100, "Test"),
            ]);

            expect(image).toHavePixelWithColor(88, 109, "#000000ff");
        });
    });
});
