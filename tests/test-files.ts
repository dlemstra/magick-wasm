/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorProfile } from '@src/profiles/color/color-profile';
import { readFileSync } from 'node:fs';

export class TestFile {
    readonly data: Buffer;

    constructor(fileName: string) {
        this.data = readFileSync(fileName);
    }
}

export class TestColorProfile extends TestFile {
    constructor(fileName: string) {
        super(fileName);
    }

    public load(): ColorProfile {
        return new ColorProfile(this.data);
    }
}

export class TestFiles {
    static profiles = {
        color: {
            sRGB: new TestColorProfile('tests/files/color-profiles/sRGB.icm'),
            USWebCoatedSWOP: new TestColorProfile('tests/files/color-profiles/USWebCoatedSWOP.icc')
        }
    }
}
