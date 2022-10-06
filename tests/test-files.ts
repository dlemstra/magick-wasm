// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestFile } from './test-file';

export class TestFiles {
    static readonly fujiFilmFinePixS1ProJpg = new TestFile('tests/images/fuji-film-fine-pix-s1-pro.jpg');

    static readonly imageMagickJpg = new TestFile('tests/images/image-magick.jpg');

    static readonly kaushanScriptRegularTtf = new TestFile('tests/fonts/KaushanScript-Regular.ttf');

    static readonly redPng = new TestFile('tests/images/red.png');

    static readonly roseSparkleGif = new TestFile('tests/images/röse-sparkle.gif');
}
