/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from "../../enums/color-space";

/** @internal */
export class ColorProfileData {
    colorSpace: ColorSpace = ColorSpace.Undefined;

    copyright: string | null = null;

    description: string | null = null;

    manufacturer: string | null = null;

    model: string | null = null;
}
