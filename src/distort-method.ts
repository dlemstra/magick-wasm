// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

export enum DistortMethod {
    Undefined,
    Affine,
    AffineProjection,
    ScaleRotateTranslate,
    Perspective,
    PerspectiveProjection,
    BilinearForward,
    BilinearReverse,
    Polynomial,
    Arc,
    Polar,
    DePolar,
    Cylinder2Plane,
    Plane2Cylinder,
    Barrel,
    BarrelInverse,
    Shepards,
    Resize,
    Sentinel,
    RigidAffine,
}
