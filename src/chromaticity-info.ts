// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { PrimaryInfo } from "./primary-info";

export class ChromaticityInfo {
    red: PrimaryInfo;
    green: PrimaryInfo;
    blue: PrimaryInfo;
    white: PrimaryInfo;

    constructor(red: PrimaryInfo, green: PrimaryInfo, blue: PrimaryInfo, white: PrimaryInfo) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.white = white;
    }
}
