/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies compression methods.
 */
export const CompressionMethod = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * B44A.
     */
    B44A: 1,

    /**
     * B44.
     */
    B44: 2,

    /**
     * BZip.
     */
    BZip: 3,

    /**
     * DXT1.
     */
    DXT1: 4,

    /**
     * DXT3.
     */
    DXT3: 5,

    /**
     * DXT5.
     */
    DXT5: 6,

    /**
     * Fax.
     */
    Fax: 7,

    /**
     * Group4.
     */
    Group4: 8,

    /**
     * JBIG1.
     */
    JBIG1: 9,

    /**
     * JBIG2.
     */
    JBIG2: 10,

    /**
     * JPEG2000.
     */
    JPEG2000: 11,

    /**
     * JPEG.
     */
    JPEG: 12,

    /**
     * Lossless JPEG.
     */
    LosslessJPEG: 13,

    /**
     * LZMA.
     */
    LZMA: 14,

    /**
     * LZW.
     */
    LZW: 15,

    /**
     * No compression.
     */
    NoCompression: 16,

    /**
     * Piz.
     */
    Piz: 17,

    /**
     * Pxr24.
     */
    Pxr24: 18,

    /**
     * RLE.
     */
    RLE: 19,

    /**
     * Zip.
     */
    Zip: 20,

    /**
     * ZipS.
     */
    ZipS: 21,

    /**
     * Zstd.
     */
    Zstd: 22,

    /**
     * WebP.
     */
    WebP: 23,

    /**
     * DWAA.
     */
    DWAA: 24,

    /**
     * DWAB.
     */
    DWAB: 25,

    /**
     * BC7.
     */
    BC7: 26,

    /**
     * BC6.
     */
    BC5: 27
} as const;

export type CompressionMethod = typeof CompressionMethod[keyof typeof CompressionMethod];
