// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { writeFileSync } from 'node:fs';
import { IMagickImage } from '@src/magick-image';
import { MagickFormat } from '@src/enums/magick-format';

export function saveImage(image: IMagickImage, fileName: string): void {
    const info = fileName.split('.');
    const format = info[info.length - 1].toUpperCase() as MagickFormat;
    image.write(format, data => {
        writeFileSync(fileName, data);
    });
}
