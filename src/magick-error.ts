// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickErrorSeverity } from './magick-error-severity';

export class MagickError extends Error {
    private _relatedErrors: MagickError[] = [];

    private readonly _severity: MagickErrorSeverity;

    constructor(message: string, severity: MagickErrorSeverity = MagickErrorSeverity.Error) {
        super(message);

        this._severity = severity;
    }

    get relatedErrors(): ReadonlyArray<MagickError> { return this._relatedErrors; }

    get severity(): MagickErrorSeverity { return this._severity; }

    /** @internal */
    public _setRelatedErrors(relatedErrors: MagickError[]) {
        this._relatedErrors = relatedErrors;
    }
}
