// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import * as fs from 'fs';

export class TestFont {
    readonly name: string;
    readonly data: Buffer;

    constructor(name: string, fileName: string) {
        this.name = name;
        this.data = fs.readFileSync(fileName);
    }
}

export class TestFonts {
    static readonly kaushanScriptRegularTtf = new TestFont('KaushanScript', 'tests/fonts/KaushanScript-Regular.ttf');
}
