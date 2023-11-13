// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 * Specifies the built-in kernels.
 */
export enum Kernel {
    /**
     * Undefined.
     */
    Undefined = 'Undefined',

    /**
     * Unity.
     */
    Unity = 'Unity',

    /**
     * Gaussian.
     */
    Gaussian = 'Gaussian',

    /**
     * DoG.
     */
    DoG = 'DoG',

    /**
     * LoG.
     */
    LoG = 'LoG',

    /**
     * Blur.
     */
    Blur = 'Blur',

    /**
     * Comet.
     */
    Comet = 'Comet',

    /**
     * Binomial.
     */
    Binomial = 'Binomial',

    /**
     * Laplacian.
     */
    Laplacian = 'Laplacian',

    /**
     * Sobel.
     */
    Sobel = 'Sobel',

    /**
     * Frei chen.
     */
    FreiChen = 'FreiChen',

    /**
     * Roberts.
     */
    Roberts = 'Roberts',

    /**
     * Prewitt.
     */
    Prewitt = 'Prewitt',

    /**
     * Compass.
     */
    Compass = 'Compass',

    /**
     * Kirsch.
     */
    Kirsch = 'Kirsch',

    /**
     * Diamond.
     */
    Diamond = 'Diamond',

    /**
     * Square.
     */
    Square = 'Square',

    /**
     * Rectangle.
     */
    Rectangle = 'Rectangle',

    /**
     * Octagon.
     */
    Octagon = 'Octagon',

    /**
     * Disk.
     */
    Disk = 'Disk',

    /**
     * Plus.
     */
    Plus = 'Plus',

    /**
     * Cross.
     */
    Cross = 'Cross',

    /**
     * Ring.
     */
    Ring = 'Ring',

    /**
     * Peaks.
     */
    Peaks = 'Peaks',

    /**
     * Edges.
     */
    Edges = 'Edges',

    /**
     * Corners.
     */
    Corners = 'Corners',

    /**
     * Diagonals.
     */
    Diagonals = 'Diagonals',

    /**
     * Line ends.
     */
    LineEnds = 'LineEnds',

    /**
     * Line junctions.
     */
    LineJunctions = 'LineJunctions',

    /**
     * Ridges.
     */
    Ridges = 'Ridges',

    /**
     * Convex hull.
     */
    ConvexHull = 'ConvexHull',

    /**
     * Thin SE.
     */
    ThinSE = 'ThinSE',

    /**
     * Skeleton.
     */
    Skeleton = 'Skeleton',

    /**
     * Chebyshev.
     */
    Chebyshev = 'Chebyshev',

    /**
     * Manhattan.
     */
    Manhattan = 'Manhattan',

    /**
     * Octagonal.
     */
    Octagonal = 'Octagonal',

    /**
     * Euclidean.
     */
    Euclidean = 'Euclidean',

    /**
     * User defined.
     */
    UserDefined = 'UserDefined',
}
