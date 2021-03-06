// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { IDefine } from '../../src/defines/define';
import { DefinesCreator } from '../../src/defines/defines-creator';
import { MagickFormat } from '../../src/magick-format';
import { MagickReadSettings } from '../../src/settings/magick-read-settings';

class TestDefinesCreator extends DefinesCreator {
    constructor () {
        super(MagickFormat.A);
    }

    getDefines (): IDefine[] {
        return [this.createDefine("test", "empty")];
    }
}

describe('DefinesCreator', () => {
    it('should return correct define', () => {
        const readSettings = new MagickReadSettings();
        readSettings.setDefines(new TestDefinesCreator());

        expect(readSettings.getDefine(MagickFormat.A, 'test')).toBe("empty");
    });
});