// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

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