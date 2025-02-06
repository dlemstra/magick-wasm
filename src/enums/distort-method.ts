/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies distortion methods.
 */
export const DistortMethod = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Affine.
     */
    Affine: 1,

    /**
     * Affine projection.
     */
    AffineProjection: 2,

    /**
     * Scale rotate translate.
     */
    ScaleRotateTranslate: 3,

    /**
     * Perspective.
     */
    Perspective: 4,

    /**
     * Perspective projection.
     */
    PerspectiveProjection: 5,

    /**
     * Bilinear forward.
     */
    BilinearForward: 6,

    /**
     * Bilinear reverse.
     */
    BilinearReverse: 7,

    /**
     * Polynomial.
     */
    Polynomial: 8,

    /**
     * Arc.
     */
    Arc: 9,

    /**
     * Polar.
     */
    Polar: 10,

    /**
     * De-polar.
     */
    DePolar: 11,

    /**
     * Cylinder 2 plane.
     */
    Cylinder2Plane: 12,

    /**
     * Plane 2 cylinder.
     */
    Plane2Cylinder: 13,

    /**
     * Barrel.
     */
    Barrel: 14,

    /**
     * Barrel inverse.
     */
    BarrelInverse: 15,

    /**
     * Shepards.
     */
    Shepards: 16,

    /**
     * Resize.
     */
    Resize: 17,

    /**
     * Sentinel.
     */
    Sentinel: 18,

    /**
     * Rigid affine.
     */
    RigidAffine: 19
} as const;

export type DistortMethod = typeof DistortMethod[keyof typeof DistortMethod];
