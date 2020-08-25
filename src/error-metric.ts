/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

export enum ErrorMetric {
    Undefined,
    Absolute,
    Fuzz,
    MeanAbsolute,
    MeanErrorPerPixel,
    MeanSquared,
    NormalizedCrossCorrelation,
    PeakAbsolute,
    PeakSignalToNoiseRatio,
    PerceptualHash,
    RootMeanSquared,
    StructuralSimilarity,
    StructuralDissimilarity,
}