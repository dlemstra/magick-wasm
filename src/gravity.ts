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
