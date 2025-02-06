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
    Forget: 1,

    /**
     * Northwest
     */
    Northwest: 2,

    /**
     * North
     */
    North: 3,

    /**
     * Northeast
     */
    Northeast: 4,

    /**
     * West
     */
    West: 5,

    /**
     * Center
     */
    Center: 6,

    /**
     * East
     */
    East: 7,

    /**
     * Southwest
     */
    Southwest: 8,

    /**
     * South
     */
    South: 9,

    /**
     * Southeast
     */
    Southeast: 10
} as const;

export type Gravity = typeof Gravity[keyof typeof Gravity];

/** @internal */
export function* _getEdges(gravities: Gravity[]): Generator<string> {
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
