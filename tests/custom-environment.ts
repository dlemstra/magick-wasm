// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagickApi } from "@dlemstra/magick-native/magick";
import * as ImageMagick from "../src/image-magick";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace globalThis {
    let native: ImageMagickApi | undefined;
}


if (!globalThis.native) {
    await ImageMagick.initializeImageMagick();
    globalThis.native = ImageMagick.ImageMagick._api;
}
