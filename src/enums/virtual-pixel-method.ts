/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the types of virtual pixel methods.
 */
export const VirtualPixelMethod = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Background.
     */
    Background: 1,

    /**
     * Dither.
     */
    Dither: 2,

    /**
     * Edge.
     */
    Edge: 3,

    /**
     * Mirror.
     */
    Mirror: 4,

    /**
     * Random.
     */
    Random: 5,

    /**
     * Tile.
     */
    Tile: 6,

    /**
     * Transparent.
     */
    Transparent: 7,

    /**
     * Mask.
     */
    Mask: 8,

    /**
     * Black.
     */
    Black: 9,

    /**
     * Gray.
     */
    Gray: 10,

    /**
     * White.
     */
    White: 11,

    /**
     * Horizontal tile.
     */
    HorizontalTile: 12,

    /**
     * Vertical tile.
     */
    VerticalTile: 13,

    /**
     * Horizontal tile edge.
     */
    HorizontalTileEdge: 14,

    /**
     * Vertical tile edge.
     */
    VerticalTileEdge: 15,

    /**
     * Checker tile.
     */
    CheckerTile: 16
} as const;

export type VirtualPixelMethod = typeof VirtualPixelMethod[keyof typeof VirtualPixelMethod];
