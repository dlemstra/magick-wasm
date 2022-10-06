// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDefine } from '../../defines/define';
import { DefinesCreator } from '../../defines/defines-creator';
import { MagickFormat } from '../../magick-format';
import { DngOutputColor } from './dng-output-color';

export class DngReadDefines extends DefinesCreator {
    disableAutoBrightness?: boolean;

    outputColor?: DngOutputColor;

    useAutoWhitebalance?: boolean;

    useCameraWhitebalance?: boolean;

    constructor() {
        super(MagickFormat.Dng);
    }

    getDefines(): IDefine[] {
        const defines: IDefine[] = [];

        if (this.disableAutoBrightness != null) defines.push(this.createDefine('no-auto-bright', this.disableAutoBrightness));

        if (this.outputColor != null) defines.push(this.createDefine('output-color', this.outputColor));

        if (this.useCameraWhitebalance != null) defines.push(this.createDefine('use-camera-wb', this.useCameraWhitebalance));

        if (this.useAutoWhitebalance != null) defines.push(this.createDefine('use-auto-wb', this.useAutoWhitebalance));

        return defines;
    }
}
