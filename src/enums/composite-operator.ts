/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the composite operators.
 */
export const CompositeOperator = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Alpha.
     */
    Alpha: 1,

    /**
     * Atop.
     */
    Atop: 2,

    /**
     * Blend.
     */
    Blend: 3,

    /**
     * Blur.
     */
    Blur: 4,

    /**
     * Bumpmap.
     */
    Bumpmap: 5,

    /**
     * Change mask.
     */
    ChangeMask: 6,

    /**
     * Clear.
     */
    Clear: 7,

    /**
     * Color burn.
     */
    ColorBurn: 8,

    /**
     * Color dodge.
     */
    ColorDodge: 9,

    /**
     * Colorize.
     */
    Colorize: 10,

    /**
     * Copy black.
     */
    CopyBlack: 11,

    /**
     * Copy blue.
     */
    CopyBlue: 12,

    /**
     * Copy.
     */
    Copy: 13,

    /**
     * Copy cyan.
     */
    CopyCyan: 14,

    /**
     * Copy green.
     */
    CopyGreen: 15,

    /**
     * Copy magenta.
     */
    CopyMagenta: 16,

    /**
     * Copy alpha.
     */
    CopyAlpha: 17,

    /**
     * Copy red.
     */
    CopyRed: 18,

    /**
     * Copy yellow.
     */
    CopyYellow: 19,

    /**
     * Darken.
     */
    Darken: 20,

    /**
     * Darken intensity.
     */
    DarkenIntensity: 21,

    /**
     * Difference.
     */
    Difference: 22,

    /**
     * Displace.
     */
    Displace: 23,

    /**
     * Dissolve.
     */
    Dissolve: 24,

    /**
     * Distort.
     */
    Distort: 25,

    /**
     * Divide dst.
     */
    DivideDst: 26,

    /**
     * Divide src.
     */
    DivideSrc: 27,

    /**
     * Dst atop.
     */
    DstAtop: 28,

    /**
     * Dst.
     */
    Dst: 29,

    /**
     * Dst in.
     */
    DstIn: 30,

    /**
     * Dst out.
     */
    DstOut: 31,

    /**
     * Dst over.
     */
    DstOver: 32,

    /**
     * Exclusion.
     */
    Exclusion: 33,

    /**
     * Hard light.
     */
    HardLight: 34,

    /**
     * Hard mix.
     */
    HardMix: 35,

    /**
     * Hue.
     */
    Hue: 36,

    /**
     * In.
     */
    In: 37,

    /**
     * Intensity.
     */
    Intensity: 38,

    /**
     * Lighten.
     */
    Lighten: 39,

    /**
     * Lighten intensity.
     */
    LightenIntensity: 40,

    /**
     * Linear burn.
     */
    LinearBurn: 41,

    /**
     * Linear dodge.
     */
    LinearDodge: 42,

    /**
     * Linear light.
     */
    LinearLight: 43,

    /**
     * Luminize.
     */
    Luminize: 44,

    /**
     * Mathematics.
     */
    Mathematics: 45,

    /**
     * Minus dst.
     */
    MinusDst: 46,

    /**
     * Minus src.
     */
    MinusSrc: 47,

    /**
     * Modulate.
     */
    Modulate: 48,

    /**
     * Modulus add.
     */
    ModulusAdd: 49,

    /**
     * Modulus subtract.
     */
    ModulusSubtract: 50,

    /**
     * Multiply.
     */
    Multiply: 51,

    /**
     * No.
     */
    No: 52,

    /**
     * Out.
     */
    Out: 53,

    /**
     * Over.
     */
    Over: 54,

    /**
     * Overlay.
     */
    Overlay: 55,

    /**
     * Pegtop light.
     */
    PegtopLight: 56,

    /**
     * Pin light.
     */
    PinLight: 57,

    /**
     * Plus.
     */
    Plus: 58,

    /**
     * Replace.
     */
    Replace: 59,

    /**
     * Saturate.
     */
    Saturate: 60,

    /**
     * Screen.
     */
    Screen: 61,

    /**
     * Soft light.
     */
    SoftLight: 62,

    /**
     * Src atop.
     */
    SrcAtop: 63,

    /**
     * Src.
     */
    Src: 64,

    /**
     * Src in.
     */
    SrcIn: 65,

    /**
     * Src out.
     */
    SrcOut: 66,

    /**
     * Src over.
     */
    SrcOver: 67,

    /**
     * Threshold.
     */
    Threshold: 68,

    /**
     * Vivid light.
     */
    VividLight: 69,

    /**
     * Xor.
     */
    Xor: 70,

    /**
     * Stereo.
     */
    Stereo: 71,

    /**
     * Freeze.
     */
    Freeze: 72,

    /**
     * Interpolate.
     */
    Interpolate: 73,

    /**
     * Negate.
     */
    Negate: 74,

    /**
     * Reflect.
     */
    Reflect: 75,

    /**
     * Soft burn.
     */
    SoftBurn: 76,

    /**
     * Soft dodge.
     */
    SoftDodge: 77,

    /**
     * Stamp.
     */
    Stamp: 78,

    /**
     * Root-mean-square error.
     */
    RMSE: 79,

    /**
     * Saliency blend.
     */
    SaliencyBlend: 80,

    /**
     * Seamless blend.
     */
    SeamlessBlend: 81
} as const;

export type CompositeOperator = typeof CompositeOperator[keyof typeof CompositeOperator];
