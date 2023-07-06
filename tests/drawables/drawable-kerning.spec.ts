// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableText } from "../../src/drawables/drawable-text";
import { DrawableKerning } from "../../src/drawables/drawable-kerning";
import { DrawableFillColor } from "../../src/drawables/drawable-fill-color";
import { DrawableFont } from "../../src/drawables/drawable-font";
import { DrawableFontPointSize } from "../../src/drawables/drawable-font-point-size";
import { MagickColor } from "../../src/magick-color";
import { TestFonts } from "../test-fonts";
import { TestImages } from "../test-images";

describe("DrawableKerning", () => {
    it("should write text with kerning to the image", () => {
        TestImages.emptyCanvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(100),
                new DrawableKerning(10),
                new DrawableFillColor(new MagickColor("pink")),
                new DrawableText(0, 109, "I I"),
            ]);

            expect(image).toHavePixelWithColor(100, 80, "#ffc0cbff");
        });
    });

    it("should write text without kerning to the image", () => {
        TestImages.emptyCanvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(100),
                new DrawableFillColor(new MagickColor("pink")),
                new DrawableText(0, 109, "I I"),
            ]);

            expect(image).toHavePixelWithColor(100, 80, "#ffffffff");
        });
    });
});
