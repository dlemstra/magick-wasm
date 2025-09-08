/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies the placement gravity.
 */
export const Gravity = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Forget.
     */
    Forget: 0,

    /**
     * Northwest
     */
    Northwest: 1,

    /**
     * North
     */
    North: 2,

    /**
     * Northeast
     */
    Northeast: 3,

    /**
     * West
     */
    West: 4,

    /**
     * Center
     */
    Center: 5,

    /**
     * East
     */
    East: 6,

    /**
     * Southwest
     */
    Southwest: 7,

    /**
     * South
     */
    South: 8,

    /**
     * Southeast
     */
    Southeast: 9
} as const;

export type Gravity = typeof Gravity[keyof typeof Gravity];

/** @internal */
export function* _getGravityEdges(gravities: Gravity[]): Generator<string> {
    for (const gravity of gravities) {
        switch (gravity) {
            case Gravity.North:
                yield 'north'
                break
            case Gravity.Northeast:
                yield 'north'
                yield 'east'
                break
            case Gravity.Northwest:
                yield 'north'
                yield 'west'
                break
            case Gravity.East:
                yield 'east'
                break
            case Gravity.West:
                yield 'west'
                break
            case Gravity.South:
                yield 'south'
                break
            case Gravity.Southeast:
                yield 'south'
                yield 'east'
                break
            case Gravity.Southwest:
                yield 'south'
                yield 'west'
        }
    }
}

/** @internal */
export function _getGravityName(gravity?: Gravity): string | undefined {
    switch (gravity) {
        case Gravity.North:
            return 'north';
        case Gravity.Northeast:
            return 'northeast';
        case Gravity.Northwest:
            return 'northwest';
        case Gravity.East:
            return 'east';
        case Gravity.West:
            return 'west';
        case Gravity.South:
            return 'south';
        case Gravity.Southeast:
            return 'southeast';
        case Gravity.Southwest:
            return 'southwest';
        case Gravity.Center:
            return 'center';
        default:
            return undefined;
    }
}
