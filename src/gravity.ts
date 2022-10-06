// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

export enum Gravity {
    Undefined,
    Forget = 0,
    Northwest = 1,
    North = 2,
    Northeast = 3,
    West = 4,
    Center = 5,
    East = 6,
    Southwest = 7,
    South = 8,
    Southeast = 9,
}

/** @internal */
export function _getEdges(gravities: Gravity[]): string {
    const edges = gravities.flatMap(gravity => {
        switch (gravity) {
            case Gravity.North:
                return 'north';
            case Gravity.Northeast:
                return ['north', 'east'];
            case Gravity.Northwest:
                return ['north', 'west'];
            case Gravity.East:
                return 'east';
            case Gravity.West:
                return 'west';
            case Gravity.South:
                return 'south';
            case Gravity.Southeast:
                return ['south', 'east'];
            case Gravity.Southwest:
                return ['south', 'west'];
            default:
                return [];
        }
    });
    return [...new Set(edges)].join(',');
}
