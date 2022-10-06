// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import * as fs from 'fs';
import { MagickFormat } from '../src/magick-format';
import { IMagickImage } from '../src/magick-image';

export function saveImage(image: IMagickImage, fileName: string): void {
    const info = fileName.split('.');
    const format = info[info.length - 1].toUpperCase() as MagickFormat;
    image.write(data => {
        fs.writeFileSync(fileName, data);
    }, format);
}
