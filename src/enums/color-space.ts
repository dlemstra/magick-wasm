/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies a kind of color space.
 */
export const ColorSpace = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * CMY.
     */
    CMY: 1,

    /**
     * CMYK.
     */
    CMYK: 2,

    /**
     * Gray.
     */
    Gray: 3,

    /**
     * HCL.
     */
    HCL: 4,

    /**
     * HCLp.
     */
    HCLp: 5,

    /**
     * HSB.
     */
    HSB: 6,

    /**
     * HSI.
     */
    HSI: 7,

    /**
     * HSL.
     */
    HSL: 8,

    /**
     * HSV.
     */
    HSV: 9,

    /**
     * HWB.
     */
    HWB: 10,

    /**
     * Lab
     */
    Lab: 11,

    /**
     * LCH.
     */
    LCH: 12,

    /**
     * LCHab.
     */
    LCHab: 13,

    /**
     * LCHuv.
     */
    LCHuv: 14,

    /**
     * Log.
     */
    Log: 15,

    /**
     * LMS.
     */
    LMS: 16,

    /**
     * Luv.
     */
    Luv: 17,

    /**
     * OHTA.
     */
    OHTA: 18,

    /**
     * Rec601YCbCr.
     */
    Rec601YCbCr: 19,

    /**
     * Rec709YCbCr.
     */
    Rec709YCbCr: 20,

    /**
     * RGB.
     */
    RGB: 21,

    /**
     * scRGB.
     */
    scRGB: 22,

    /**
     * sRGB.
     */
    sRGB: 23,

    /**
     * Transparent.
     */
    Transparent: 24,

    /**
     * XyY.
     */
    XyY: 25,

    /**
     * XYZ.
     */
    XYZ: 26,

    /**
     * YCbCr.
     */
    YCbCr: 27,

    /**
     * YCC.
     */
    YCC: 28,

    /**
     * YDbDr.
     */
    YDbDr: 29,

    /**
     * YIQ.
     */
    YIQ: 30,

    /**
     * YPbPr.
     */
    YPbPr: 31,

    /**
     * YUV.
     */
    YUV: 32,

    /**
     * LinearGray.
     */
    LinearGray: 33,

    /**
     * Jzazbz.
     */
    Jzazbz: 34,

    /**
     * DisplayP3.
     */
    DisplayP3: 35,

    /**
     * Adobe98.
     */
    Adobe98: 36,

    /**
     * ProPhoto.
     */
    ProPhoto: 37,

    /**
     * Oklab.
     */
    Oklab: 38,

    /**
     * Oklch.
     */
    Oklch: 39,

    /**
     * CAT02LMS.
     */
    CAT02LMSC: 40,
} as const;

export type ColorSpace = typeof ColorSpace[keyof typeof ColorSpace];

/* @internal */
export const ColorSpaceNames: { [key in ColorSpace]: string } = {
    [ColorSpace.Undefined]: 'Undefined',
    [ColorSpace.CMY]: 'CMY',
    [ColorSpace.CMYK]: 'CMYK',
    [ColorSpace.Gray]: 'Gray',
    [ColorSpace.HCL]: 'HCL',
    [ColorSpace.HCLp]: 'HCLp',
    [ColorSpace.HSB]: 'HSB',
    [ColorSpace.HSI]: 'HSI',
    [ColorSpace.HSL]: 'HSL',
    [ColorSpace.HSV]: 'HSV',
    [ColorSpace.HWB]: 'HWB',
    [ColorSpace.Lab]: 'Lab',
    [ColorSpace.LCH]: 'LCH',
    [ColorSpace.LCHab]: 'LCHab',
    [ColorSpace.LCHuv]: 'LCHuv',
    [ColorSpace.Log]: 'Log',
    [ColorSpace.LMS]: 'LMS',
    [ColorSpace.Luv]: 'Luv',
    [ColorSpace.OHTA]: 'OHTA',
    [ColorSpace.Rec601YCbCr]: 'Rec601YCbCr',
    [ColorSpace.Rec709YCbCr]: 'Rec709YCbCr',
    [ColorSpace.RGB]: 'RGB',
    [ColorSpace.scRGB]: 'scRGB',
    [ColorSpace.sRGB]: 'sRGB',
    [ColorSpace.Transparent]: 'Transparent',
    [ColorSpace.XyY]: 'XyY',
    [ColorSpace.XYZ]: 'XYZ',
    [ColorSpace.YCbCr]: 'YCbCr',
    [ColorSpace.YCC]: 'YCC',
    [ColorSpace.YDbDr]: 'YDbDr',
    [ColorSpace.YIQ]: 'YIQ',
    [ColorSpace.YPbPr]: 'YPbPr',
    [ColorSpace.YUV]: 'YUV',
    [ColorSpace.LinearGray]: 'LinearGray',
    [ColorSpace.Jzazbz]: 'Jzazbz',
    [ColorSpace.DisplayP3]: 'DisplayP3',
    [ColorSpace.Adobe98]: 'Adobe98',
    [ColorSpace.ProPhoto]: 'ProPhoto',
    [ColorSpace.Oklab]: 'Oklab',
    [ColorSpace.Oklch]: 'Oklch',
    [ColorSpace.CAT02LMSC]: 'CAT02LMS',
};
