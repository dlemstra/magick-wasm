// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Threshold } from '@src/types/threshold'

describe('Threshold#toString', () => {
    it('should return the minimum value as a string when maximum is 0', () => {
        const threshold = new Threshold(10)
        expect(threshold.toString()).toBe('10')
    })

    it('should return the threshold range as a string when maximum is not 0', () => {
        const threshold = new Threshold(10, 20)
        expect(threshold.toString()).toBe('10-20')
    })
})
