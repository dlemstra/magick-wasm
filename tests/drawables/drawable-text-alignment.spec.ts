// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableFont } from "@src/drawables/drawable-font";
import { DrawableFontPointSize } from "@src/drawables/drawable-font-point-size";
import { DrawableText } from "@src/drawables/drawable-text";
import { DrawableTextAlignment } from "@src/drawables/drawable-text-alignment";
import { TestFonts } from "@test/test-fonts";
import { TestImages } from "@test/test-images";
import { TextAlignment } from "@src/enums/text-alignment";

describe("DrawableTextAlignment", () => {
    it("should write text without alignment to the image", () => {
        TestImages.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableText(0, 100, "Test"),
            ]);

            expect(image).toHavePixelWithColor(126, 75, "#000000ff");
            expect(image).toHavePixelWithColor(49, 79, "#ffffffff");
        });
    });

    it("should write text with alignment to the image", () => {
        TestImages.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableTextAlignment(TextAlignment.Center),
                new DrawableText(0, 100, "Test"),
            ]);

            expect(image).toHavePixelWithColor(126, 75, "#ffffffff");
            expect(image).toHavePixelWithColor(49, 79, "#000000ff");
        });
    });
});
