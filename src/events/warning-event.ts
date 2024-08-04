/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickError } from '../magick-error';

/**
 * Class for warning events.
 */
export class WarningEvent {
    /** @internal */
    constructor(error: MagickError) {
        this.error = error;
    }

    /**
     * Gets the warning that was raised.
     */
    readonly error: MagickError;
}
