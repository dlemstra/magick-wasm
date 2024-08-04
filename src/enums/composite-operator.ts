/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the composite operators.
 */
export enum CompositeOperator {
    /**
     * Undefined.
     */
    Undefined,

    /**
     * Alpha.
     */
    Alpha,

    /**
     * Atop.
     */
    Atop,

    /**
     * Blend.
     */
    Blend,

    /**
     * Blur.
     */
    Blur,

    /**
     * Bumpmap.
     */
    Bumpmap,

    /**
     * Change mask.
     */
    ChangeMask,

    /**
     * Clear.
     */
    Clear,

    /**
     * Color burn.
     */
    ColorBurn,

    /**
     * Color dodge.
     */
    ColorDodge,

    /**
     * Colorize.
     */
    Colorize,

    /**
     * Copy black.
     */
    CopyBlack,

    /**
     * Copy blue.
     */
    CopyBlue,

    /**
     * Copy.
     */
    Copy,

    /**
     * Copy cyan.
     */
    CopyCyan,

    /**
     * Copy green.
     */
    CopyGreen,

    /**
     * Copy magenta.
     */
    CopyMagenta,

    /**
     * Copy alpha.
     */
    CopyAlpha,

    /**
     * Copy red.
     */
    CopyRed,

    /**
     * Copy yellow.
     */
    CopyYellow,

    /**
     * Darken.
     */
    Darken,

    /**
     * Darken intensity.
     */
    DarkenIntensity,

    /**
     * Difference.
     */
    Difference,

    /**
     * Displace.
     */
    Displace,

    /**
     * Dissolve.
     */
    Dissolve,

    /**
     * Distort.
     */
    Distort,

    /**
     * Divide dst.
     */
    DivideDst,

    /**
     * Divide src.
     */
    DivideSrc,

    /**
     * Dst atop.
     */
    DstAtop,

    /**
     * Dst.
     */
    Dst,

    /**
     * Dst in.
     */
    DstIn,

    /**
     * Dst out.
     */
    DstOut,

    /**
     * Dst over.
     */
    DstOver,

    /**
     * Exclusion.
     */
    Exclusion,

    /**
     * Hard light.
     */
    HardLight,

    /**
     * Hard mix.
     */
    HardMix,

    /**
     * Hue.
     */
    Hue,

    /**
     * In.
     */
    In,

    /**
     * Intensity.
     */
    Intensity,

    /**
     * Lighten.
     */
    Lighten,

    /**
     * Lighten intensity.
     */
    LightenIntensity,

    /**
     * Linear burn.
     */
    LinearBurn,

    /**
     * Linear dodge.
     */
    LinearDodge,

    /**
     * Linear light.
     */
    LinearLight,

    /**
     * Luminize.
     */
    Luminize,

    /**
     * Mathematics.
     */
    Mathematics,

    /**
     * Minus dst.
     */
    MinusDst,

    /**
     * Minus src.
     */
    MinusSrc,

    /**
     * Modulate.
     */
    Modulate,

    /**
     * Modulus add.
     */
    ModulusAdd,

    /**
     * Modulus subtract.
     */
    ModulusSubtract,

    /**
     * Multiply.
     */
    Multiply,

    /**
     * No.
     */
    No,

    /**
     * Out.
     */
    Out,

    /**
     * Over.
     */
    Over,

    /**
     * Overlay.
     */
    Overlay,

    /**
     * Pegtop light.
     */
    PegtopLight,

    /**
     * Pin light.
     */
    PinLight,

    /**
     * Plus.
     */
    Plus,

    /**
     * Replace.
     */
    Replace,

    /**
     * Saturate.
     */
    Saturate,

    /**
     * Screen.
     */
    Screen,

    /**
     * Soft light.
     */
    SoftLight,

    /**
     * Src atop.
     */
    SrcAtop,

    /**
     * Src.
     */
    Src,

    /**
     * Src in.
     */
    SrcIn,

    /**
     * Src out.
     */
    SrcOut,

    /**
     * Src over.
     */
    SrcOver,

    /**
     * Threshold.
     */
    Threshold,

    /**
     * Vivid light.
     */
    VividLight,

    /**
     * Xor.
     */
    Xor,

    /**
     * Stereo.
     */
    Stereo,

    /**
     * Freeze.
     */
    Freeze,

    /**
     * Interpolate.
     */
    Interpolate,

    /**
     * Negate.
     */
    Negate,

    /**
     * Reflect.
     */
    Reflect,

    /**
     * Soft burn.
     */
    SoftBurn,

    /**
     * Soft dodge.
     */
    SoftDodge,

    /**
     * Stamp.
     */
    Stamp,

    /**
     * Root-mean-square error.
     */
    RMSE,

    /**
     * Saliency blend.
     */
    SaliencyBlend,

    /**
     * Seamless blend.
     */
    SeamlessBlend,
}
