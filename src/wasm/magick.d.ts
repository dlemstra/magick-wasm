declare const MagickNative : () => Promise<MagickNative>;

/** @internal */
export interface MagickNative
{
    HEAP8: Int8Array;
    _Quantum_Depth_Get(): number;
    _Magick_ImageMagickVersion_Get(): number;
}

export default MagickNative;