/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickErrorSeverity } from './enums/magick-error-severity';

/**
 * Encapsulation of the ImageMagick exception object.
 */
export class MagickError extends Error {
    private _relatedErrors: MagickError[] = [];

    /** @internal */
    constructor(message: string, severity: MagickErrorSeverity = MagickErrorSeverity.Error) {
        super(message);

        this.severity = severity;
    }

    /**
     * Gets the severity of an exception.
     */
    readonly severity: MagickErrorSeverity;

    /**
     * Gets the exceptions that are related to this exception.
     */
    get relatedErrors(): ReadonlyArray<MagickError> { return this._relatedErrors; }

    /** @internal */
    public _setRelatedErrors(relatedErrors: MagickError[]) {
        this._relatedErrors = relatedErrors;
    }
}
