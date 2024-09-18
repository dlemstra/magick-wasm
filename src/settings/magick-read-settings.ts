/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Disposable } from '../internal/disposable';
import { ImageMagick } from '../image-magick';
import { MagickGeometry } from '../types/magick-geometry';
import { MagickSettings } from './magick-settings';
import { NativeMagickSettings } from './native-magick-settings';
import { _withString } from '../internal/native/string';

/**
 * Class that contains setting for when an image is being read.
 */
export class MagickReadSettings extends MagickSettings {

    constructor(partialSettings?: Partial<MagickReadSettings>) {
        super();

        Object.assign(this, partialSettings);
    }

    /**
     * Gets or sets the specified area to extract from the image.
     */
    extractArea?: MagickGeometry;

    /**
     * Gets or sets the height.
     */
    height?: number;

    /**
     * Gets or sets the width.
     */
    width?: number;

    /** @internal */
    _use<TReturnType>(func: (settings: NativeMagickSettings) => TReturnType): TReturnType {
        const settings = new NativeMagickSettings(this);

        const size = this.getSize();
        if (size !== '') {
            _withString(size, sizePtr => {
                ImageMagick._api._MagickSettings_SetSize(settings._instance, sizePtr);
            });
        }

        if (this.extractArea !== undefined) {
            _withString(this.extractArea.toString(), extractAreaPtr => {
                ImageMagick._api._MagickSettings_Extract_Set(settings._instance, extractAreaPtr);
            });
        }

        return Disposable._disposeAfterExecution(settings, func);
    }

    private getSize(): string {
        if (this.width !== undefined && this.height !== undefined)
            return `${this.width}x${this.height}`;
        else if (this.width !== undefined)
            return `${this.width}x`;
        else if (this.height !== undefined)
            return `x${this.height}`;
        else
            return '';
    }
}
