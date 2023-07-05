// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableText } from "../../src/drawables/drawable-text";
import { DrawableKerning } from "../../src/drawables/drawable-kerning";
import { DrawableFillColor } from "../../src/drawables/drawable-fill-color";
import { DrawableFont } from "../../src/drawables/drawable-font";
import { DrawableFontPointSize } from "../../src/drawables/drawable-font-point-size";
import { IMagickImage, MagickImage } from "../../src/magick-image";
import { MagickColor } from "../../src/magick-color";
import { MagickColors } from "../../src/magick-colors";
import { TestFonts } from "../test-fonts";

let image: IMagickImage;

beforeEach(() => {
    image = MagickImage.create();
    image.read(MagickColors.White, 140, 147);
});

afterEach(() => {
    image.dispose();
});

describe("DrawableKerning", () => {
    it("should write text with kerning to the image", () => {
        image.draw([
            new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
            new DrawableFontPointSize(100),
            new DrawableKerning(10),
            new DrawableFillColor(new MagickColor("pink")),
            new DrawableText(0, 109, "I I"),
        ]);

        expect(image).toHavePixelWithColor(100, 80, "#ffc0cbff");
    });

    it("should write text without kerning to the image", () => {
        image.draw([
            new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
            new DrawableFontPointSize(100),
            new DrawableFillColor(new MagickColor("pink")),
            new DrawableText(0, 109, "I I"),
        ]);

        expect(image).toHavePixelWithColor(100, 80, "#ffffffff");
    });
});
