// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickErrorSeverity } from './enums/magick-error-severity';

/**
 *
 */
export class MagickError extends Error {
    private _relatedErrors: MagickError[] = [];

    constructor(message: string, severity: MagickErrorSeverity = MagickErrorSeverity.Error) {
        super(message);

        this.severity = severity;
    }

    /**
     *
     */
    readonly severity: MagickErrorSeverity;

    get relatedErrors(): ReadonlyArray<MagickError> { return this._relatedErrors; }

    /** @internal */
    public _setRelatedErrors(relatedErrors: MagickError[]) {
        this._relatedErrors = relatedErrors;
    }
}
