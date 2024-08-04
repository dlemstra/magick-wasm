/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColor, IMagickColor } from './magick-color';

export class MagickColors {
    /**
     * Gets a system-defined color that has an RGBA value of #00000000.
    */
    static get None(): IMagickColor { return new MagickColor(0, 0, 0, 0); }

    /**
     * Gets a system-defined color that has an RGBA value of #00000000.
    */
    static get Transparent(): IMagickColor { return new MagickColor(0, 0, 0, 0); }

    /**
     * Gets a system-defined color that has an RGBA value of #F0F8FFFF.
    */
    static get AliceBlue(): IMagickColor { return new MagickColor(240, 248, 255, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FAEBD7FF.
    */
    static get AntiqueWhite(): IMagickColor { return new MagickColor(250, 235, 215, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #00FFFFFF.
    */
    static get Aqua(): IMagickColor { return new MagickColor(0, 255, 255, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #7FFFD4FF.
    */
    static get Aquamarine(): IMagickColor { return new MagickColor(127, 255, 212, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #F0FFFFFF.
    */
    static get Azure(): IMagickColor { return new MagickColor(240, 255, 255, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #F5F5DCFF.
    */
    static get Beige(): IMagickColor { return new MagickColor(245, 245, 220, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFE4C4FF.
    */
    static get Bisque(): IMagickColor { return new MagickColor(255, 228, 196, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #000000FF.
    */
    static get Black(): IMagickColor { return new MagickColor(0, 0, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFEBCDFF.
    */
    static get BlanchedAlmond(): IMagickColor { return new MagickColor(255, 235, 205, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #0000FFFF.
    */
    static get Blue(): IMagickColor { return new MagickColor(0, 0, 255, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #8A2BE2FF.
    */
    static get BlueViolet(): IMagickColor { return new MagickColor(138, 43, 226, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #A52A2AFF.
    */
    static get Brown(): IMagickColor { return new MagickColor(165, 42, 42, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #DEB887FF.
    */
    static get BurlyWood(): IMagickColor { return new MagickColor(222, 184, 135, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #5F9EA0FF.
    */
    static get CadetBlue(): IMagickColor { return new MagickColor(95, 158, 160, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #7FFF00FF.
    */
    static get Chartreuse(): IMagickColor { return new MagickColor(127, 255, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #D2691EFF.
    */
    static get Chocolate(): IMagickColor { return new MagickColor(210, 105, 30, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FF7F50FF.
    */
    static get Coral(): IMagickColor { return new MagickColor(255, 127, 80, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #6495EDFF.
    */
    static get CornflowerBlue(): IMagickColor { return new MagickColor(100, 149, 237, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFF8DCFF.
    */
    static get Cornsilk(): IMagickColor { return new MagickColor(255, 248, 220, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #DC143CFF.
    */
    static get Crimson(): IMagickColor { return new MagickColor(220, 20, 60, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #00FFFFFF.
    */
    static get Cyan(): IMagickColor { return new MagickColor(0, 255, 255, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #00008BFF.
    */
    static get DarkBlue(): IMagickColor { return new MagickColor(0, 0, 139, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #008B8BFF.
    */
    static get DarkCyan(): IMagickColor { return new MagickColor(0, 139, 139, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #B8860BFF.
    */
    static get DarkGoldenrod(): IMagickColor { return new MagickColor(184, 134, 11, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #A9A9A9FF.
    */
    static get DarkGray(): IMagickColor { return new MagickColor(169, 169, 169, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #006400FF.
    */
    static get DarkGreen(): IMagickColor { return new MagickColor(0, 100, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #BDB76BFF.
    */
    static get DarkKhaki(): IMagickColor { return new MagickColor(189, 183, 107, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #8B008BFF.
    */
    static get DarkMagenta(): IMagickColor { return new MagickColor(139, 0, 139, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #556B2FFF.
    */
    static get DarkOliveGreen(): IMagickColor { return new MagickColor(85, 107, 47, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FF8C00FF.
    */
    static get DarkOrange(): IMagickColor { return new MagickColor(255, 140, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #9932CCFF.
    */
    static get DarkOrchid(): IMagickColor { return new MagickColor(153, 50, 204, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #8B0000FF.
    */
    static get DarkRed(): IMagickColor { return new MagickColor(139, 0, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #E9967AFF.
    */
    static get DarkSalmon(): IMagickColor { return new MagickColor(233, 150, 122, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #8FBC8FFF.
    */
    static get DarkSeaGreen(): IMagickColor { return new MagickColor(143, 188, 143, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #483D8BFF.
    */
    static get DarkSlateBlue(): IMagickColor { return new MagickColor(72, 61, 139, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #2F4F4FFF.
    */
    static get DarkSlateGray(): IMagickColor { return new MagickColor(47, 79, 79, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #00CED1FF.
    */
    static get DarkTurquoise(): IMagickColor { return new MagickColor(0, 206, 209, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #9400D3FF.
    */
    static get DarkViolet(): IMagickColor { return new MagickColor(148, 0, 211, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FF1493FF.
    */
    static get DeepPink(): IMagickColor { return new MagickColor(255, 20, 147, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #00BFFFFF.
    */
    static get DeepSkyBlue(): IMagickColor { return new MagickColor(0, 191, 255, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #696969FF.
    */
    static get DimGray(): IMagickColor { return new MagickColor(105, 105, 105, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #1E90FFFF.
    */
    static get DodgerBlue(): IMagickColor { return new MagickColor(30, 144, 255, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #B22222FF.
    */
    static get Firebrick(): IMagickColor { return new MagickColor(178, 34, 34, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFFAF0FF.
    */
    static get FloralWhite(): IMagickColor { return new MagickColor(255, 250, 240, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #228B22FF.
    */
    static get ForestGreen(): IMagickColor { return new MagickColor(34, 139, 34, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FF00FFFF.
    */
    static get Fuchsia(): IMagickColor { return new MagickColor(255, 0, 255, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #DCDCDCFF.
    */
    static get Gainsboro(): IMagickColor { return new MagickColor(220, 220, 220, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #F8F8FFFF.
    */
    static get GhostWhite(): IMagickColor { return new MagickColor(248, 248, 255, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFD700FF.
    */
    static get Gold(): IMagickColor { return new MagickColor(255, 215, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #DAA520FF.
    */
    static get Goldenrod(): IMagickColor { return new MagickColor(218, 165, 32, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #808080FF.
    */
    static get Gray(): IMagickColor { return new MagickColor(128, 128, 128, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #008000FF.
    */
    static get Green(): IMagickColor { return new MagickColor(0, 128, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #ADFF2FFF.
    */
    static get GreenYellow(): IMagickColor { return new MagickColor(173, 255, 47, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #F0FFF0FF.
    */
    static get Honeydew(): IMagickColor { return new MagickColor(240, 255, 240, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FF69B4FF.
    */
    static get HotPink(): IMagickColor { return new MagickColor(255, 105, 180, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #CD5C5CFF.
    */
    static get IndianRed(): IMagickColor { return new MagickColor(205, 92, 92, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #4B0082FF.
    */
    static get Indigo(): IMagickColor { return new MagickColor(75, 0, 130, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFFFF0FF.
    */
    static get Ivory(): IMagickColor { return new MagickColor(255, 255, 240, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #F0E68CFF.
    */
    static get Khaki(): IMagickColor { return new MagickColor(240, 230, 140, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #E6E6FAFF.
    */
    static get Lavender(): IMagickColor { return new MagickColor(230, 230, 250, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFF0F5FF.
    */
    static get LavenderBlush(): IMagickColor { return new MagickColor(255, 240, 245, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #7CFC00FF.
    */
    static get LawnGreen(): IMagickColor { return new MagickColor(124, 252, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFFACDFF.
    */
    static get LemonChiffon(): IMagickColor { return new MagickColor(255, 250, 205, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #ADD8E6FF.
    */
    static get LightBlue(): IMagickColor { return new MagickColor(173, 216, 230, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #F08080FF.
    */
    static get LightCoral(): IMagickColor { return new MagickColor(240, 128, 128, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #E0FFFFFF.
    */
    static get LightCyan(): IMagickColor { return new MagickColor(224, 255, 255, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FAFAD2FF.
    */
    static get LightGoldenrodYellow(): IMagickColor { return new MagickColor(250, 250, 210, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #90EE90FF.
    */
    static get LightGreen(): IMagickColor { return new MagickColor(144, 238, 144, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #D3D3D3FF.
    */
    static get LightGray(): IMagickColor { return new MagickColor(211, 211, 211, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFB6C1FF.
    */
    static get LightPink(): IMagickColor { return new MagickColor(255, 182, 193, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFA07AFF.
    */
    static get LightSalmon(): IMagickColor { return new MagickColor(255, 160, 122, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #20B2AAFF.
    */
    static get LightSeaGreen(): IMagickColor { return new MagickColor(32, 178, 170, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #87CEFAFF.
    */
    static get LightSkyBlue(): IMagickColor { return new MagickColor(135, 206, 250, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #778899FF.
    */
    static get LightSlateGray(): IMagickColor { return new MagickColor(119, 136, 153, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #B0C4DEFF.
    */
    static get LightSteelBlue(): IMagickColor { return new MagickColor(176, 196, 222, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFFFE0FF.
    */
    static get LightYellow(): IMagickColor { return new MagickColor(255, 255, 224, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #00FF00FF.
    */
    static get Lime(): IMagickColor { return new MagickColor(0, 255, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #32CD32FF.
    */
    static get LimeGreen(): IMagickColor { return new MagickColor(50, 205, 50, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FAF0E6FF.
    */
    static get Linen(): IMagickColor { return new MagickColor(250, 240, 230, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FF00FFFF.
    */
    static get Magenta(): IMagickColor { return new MagickColor(255, 0, 255, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #800000FF.
    */
    static get Maroon(): IMagickColor { return new MagickColor(128, 0, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #66CDAAFF.
    */
    static get MediumAquamarine(): IMagickColor { return new MagickColor(102, 205, 170, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #0000CDFF.
    */
    static get MediumBlue(): IMagickColor { return new MagickColor(0, 0, 205, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #BA55D3FF.
    */
    static get MediumOrchid(): IMagickColor { return new MagickColor(186, 85, 211, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #9370DBFF.
    */
    static get MediumPurple(): IMagickColor { return new MagickColor(147, 112, 219, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #3CB371FF.
    */
    static get MediumSeaGreen(): IMagickColor { return new MagickColor(60, 179, 113, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #7B68EEFF.
    */
    static get MediumSlateBlue(): IMagickColor { return new MagickColor(123, 104, 238, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #00FA9AFF.
    */
    static get MediumSpringGreen(): IMagickColor { return new MagickColor(0, 250, 154, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #48D1CCFF.
    */
    static get MediumTurquoise(): IMagickColor { return new MagickColor(72, 209, 204, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #C71585FF.
    */
    static get MediumVioletRed(): IMagickColor { return new MagickColor(199, 21, 133, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #191970FF.
    */
    static get MidnightBlue(): IMagickColor { return new MagickColor(25, 25, 112, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #F5FFFAFF.
    */
    static get MintCream(): IMagickColor { return new MagickColor(245, 255, 250, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFE4E1FF.
    */
    static get MistyRose(): IMagickColor { return new MagickColor(255, 228, 225, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFE4B5FF.
    */
    static get Moccasin(): IMagickColor { return new MagickColor(255, 228, 181, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFDEADFF.
    */
    static get NavajoWhite(): IMagickColor { return new MagickColor(255, 222, 173, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #000080FF.
    */
    static get Navy(): IMagickColor { return new MagickColor(0, 0, 128, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FDF5E6FF.
    */
    static get OldLace(): IMagickColor { return new MagickColor(253, 245, 230, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #808000FF.
    */
    static get Olive(): IMagickColor { return new MagickColor(128, 128, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #6B8E23FF.
    */
    static get OliveDrab(): IMagickColor { return new MagickColor(107, 142, 35, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFA500FF.
    */
    static get Orange(): IMagickColor { return new MagickColor(255, 165, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FF4500FF.
    */
    static get OrangeRed(): IMagickColor { return new MagickColor(255, 69, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #DA70D6FF.
    */
    static get Orchid(): IMagickColor { return new MagickColor(218, 112, 214, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #EEE8AAFF.
    */
    static get PaleGoldenrod(): IMagickColor { return new MagickColor(238, 232, 170, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #98FB98FF.
    */
    static get PaleGreen(): IMagickColor { return new MagickColor(152, 251, 152, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #AFEEEEFF.
    */
    static get PaleTurquoise(): IMagickColor { return new MagickColor(175, 238, 238, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #DB7093FF.
    */
    static get PaleVioletRed(): IMagickColor { return new MagickColor(219, 112, 147, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFEFD5FF.
    */
    static get PapayaWhip(): IMagickColor { return new MagickColor(255, 239, 213, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFDAB9FF.
    */
    static get PeachPuff(): IMagickColor { return new MagickColor(255, 218, 185, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #CD853FFF.
    */
    static get Peru(): IMagickColor { return new MagickColor(205, 133, 63, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFC0CBFF.
    */
    static get Pink(): IMagickColor { return new MagickColor(255, 192, 203, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #DDA0DDFF.
    */
    static get Plum(): IMagickColor { return new MagickColor(221, 160, 221, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #B0E0E6FF.
    */
    static get PowderBlue(): IMagickColor { return new MagickColor(176, 224, 230, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #800080FF.
    */
    static get Purple(): IMagickColor { return new MagickColor(128, 0, 128, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #663399FF.
    */
    static get RebeccaPurple(): IMagickColor { return new MagickColor(102, 51, 153, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FF0000FF.
    */
    static get Red(): IMagickColor { return new MagickColor(255, 0, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #BC8F8FFF.
    */
    static get RosyBrown(): IMagickColor { return new MagickColor(188, 143, 143, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #4169E1FF.
    */
    static get RoyalBlue(): IMagickColor { return new MagickColor(65, 105, 225, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #8B4513FF.
    */
    static get SaddleBrown(): IMagickColor { return new MagickColor(139, 69, 19, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FA8072FF.
    */
    static get Salmon(): IMagickColor { return new MagickColor(250, 128, 114, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #F4A460FF.
    */
    static get SandyBrown(): IMagickColor { return new MagickColor(244, 164, 96, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #2E8B57FF.
    */
    static get SeaGreen(): IMagickColor { return new MagickColor(46, 139, 87, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFF5EEFF.
    */
    static get SeaShell(): IMagickColor { return new MagickColor(255, 245, 238, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #A0522DFF.
    */
    static get Sienna(): IMagickColor { return new MagickColor(160, 82, 45, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #C0C0C0FF.
    */
    static get Silver(): IMagickColor { return new MagickColor(192, 192, 192, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #87CEEBFF.
    */
    static get SkyBlue(): IMagickColor { return new MagickColor(135, 206, 235, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #6A5ACDFF.
    */
    static get SlateBlue(): IMagickColor { return new MagickColor(106, 90, 205, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #708090FF.
    */
    static get SlateGray(): IMagickColor { return new MagickColor(112, 128, 144, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFFAFAFF.
    */
    static get Snow(): IMagickColor { return new MagickColor(255, 250, 250, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #00FF7FFF.
    */
    static get SpringGreen(): IMagickColor { return new MagickColor(0, 255, 127, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #4682B4FF.
    */
    static get SteelBlue(): IMagickColor { return new MagickColor(70, 130, 180, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #D2B48CFF.
    */
    static get Tan(): IMagickColor { return new MagickColor(210, 180, 140, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #008080FF.
    */
    static get Teal(): IMagickColor { return new MagickColor(0, 128, 128, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #D8BFD8FF.
    */
    static get Thistle(): IMagickColor { return new MagickColor(216, 191, 216, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FF6347FF.
    */
    static get Tomato(): IMagickColor { return new MagickColor(255, 99, 71, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #40E0D0FF.
    */
    static get Turquoise(): IMagickColor { return new MagickColor(64, 224, 208, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #EE82EEFF.
    */
    static get Violet(): IMagickColor { return new MagickColor(238, 130, 238, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #F5DEB3FF.
    */
    static get Wheat(): IMagickColor { return new MagickColor(245, 222, 179, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFFFFFFF.
    */
    static get White(): IMagickColor { return new MagickColor(255, 255, 255, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #F5F5F5FF.
    */
    static get WhiteSmoke(): IMagickColor { return new MagickColor(245, 245, 245, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #FFFF00FF.
    */
    static get Yellow(): IMagickColor { return new MagickColor(255, 255, 0, 255); }

    /**
     * Gets a system-defined color that has an RGBA value of #9ACD32FF.
    */
    static get YellowGreen(): IMagickColor { return new MagickColor(154, 205, 50, 255); }
}
