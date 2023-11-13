// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 * Specifies distortion methods.
 */
export enum DistortMethod {
    /**
     * Undefined.
     */
    Undefined,

    /**
     * Affine.
     */
    Affine,

    /**
     * Affine projection.
     */
    AffineProjection,

    /**
     * Scale rotate translate.
     */
    ScaleRotateTranslate,

    /**
     * Perspective.
     */
    Perspective,

    /**
     * Perspective projection.
     */
    PerspectiveProjection,

    /**
     * Bilinear forward.
     */
    BilinearForward,

    /**
     * Bilinear reverse.
     */
    BilinearReverse,

    /**
     * Polynomial.
     */
    Polynomial,

    /**
     * Arc.
     */
    Arc,

    /**
     * Polar.
     */
    Polar,

    /**
     * De-polar.
     */
    DePolar,

    /**
     * Cylinder 2 plane.
     */
    Cylinder2Plane,

    /**
     * Plane 2 cylinder.
     */
    Plane2Cylinder,

    /**
     * Barrel.
     */
    Barrel,

    /**
     * Barrel inverse.
     */
    BarrelInverse,

    /**
     * Shepards.
     */
    Shepards,

    /**
     * Resize.
     */
    Resize,

    /**
     * Sentinel.
     */
    Sentinel,

    /**
     * Rigid affine.
     */
    RigidAffine,
}
