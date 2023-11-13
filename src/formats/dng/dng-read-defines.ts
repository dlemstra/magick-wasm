// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DefinesCreator } from '../../defines/defines-creator';
import { DngInterpolation } from './dng-interpolation';
import { DngOutputColor } from './dng-output-color';
import { IDefine } from '../../defines/define';
import { MagickFormat } from '../../magick-format';

/**
 * Class for defines that are used when a Dng image is read.
 */
export class DngReadDefines extends DefinesCreator {
    constructor() {
        super(MagickFormat.Dng);
    }

    /**
     * Gets or sets a value indicating wether auto brightness should be used (dng:no-auto-bright).
     */
    disableAutoBrightness?: boolean;

    /**
     * Gets or sets a value indicating the interpolation quality (dng:interpolation-quality).
     */
    interpolationQuality?: DngInterpolation;

    /**
     * Gets or sets the output color (dng:output-color).
     */
    outputColor?: DngOutputColor;

    /**
    * Gets or sets a value indicating wether auto whitebalance should be used (dng:use-auto-wb).
    */
    useAutoWhitebalance?: boolean;

    /**
     * Gets or sets a value indicating wether the whitebalance of the camera should be used (dng:use-camera-wb).
     */
    useCameraWhitebalance?: boolean;

    getDefines(): IDefine[] {
        const defines: IDefine[] = [];

        if (this.hasValue(this.interpolationQuality))
            defines.push(this.createDefine('interpolation-quality', this.interpolationQuality as number));

        if (this.hasValue(this.disableAutoBrightness))
            defines.push(this.createDefine('no-auto-bright', this.disableAutoBrightness as boolean));

        if (this.hasValue(this.outputColor))
            defines.push(this.createDefine('output-color', this.outputColor as number));

        if (this.hasValue(this.useCameraWhitebalance))
            defines.push(this.createDefine('use-camera-wb', this.useCameraWhitebalance as boolean));

        if (this.hasValue(this.useAutoWhitebalance))
            defines.push(this.createDefine('use-auto-wb', this.useAutoWhitebalance as boolean));

        return defines;
    }
}
