// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 * Specifies the types of virtual pixel methods.
 */
export enum VirtualPixelMethod {
    /**
     * Undefined.
     */
    Undefined,

    /**
     * Background.
     */
    Background,

    /**
     * Dither.
     */
    Dither,

    /**
     * Edge.
     */
    Edge,

    /**
     * Mirror.
     */
    Mirror,

    /**
     * Random.
     */
    Random,

    /**
     * Tile.
     */
    Tile,

    /**
     * Transparent.
     */
    Transparent,

    /**
     * Mask.
     */
    Mask,

    /**
     * Black.
     */
    Black,

    /**
     * Gray.
     */
    Gray,

    /**
     * White.
     */
    White,

    /**
     * Horizontal tile.
     */
    HorizontalTile,

    /**
     * Vertical tile.
     */
    VerticalTile,

    /**
     * Horizontal tile edge.
     */
    HorizontalTileEdge,

    /**
     * Vertical tile edge.
     */
    VerticalTileEdge,

    /**
     * Checker tile.
     */
    CheckerTile
}
