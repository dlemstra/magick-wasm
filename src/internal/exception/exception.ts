// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../image-magick';
import { MagickError } from '../../magick-error';
import { MagickErrorSeverity } from '../../enums/magick-error-severity';
import { Pointer } from '../pointer/pointer';
import { _createString } from '../native/string';

/** @internal */
export class Exception {
    private readonly pointer: Pointer;

    private constructor(pointer: Pointer) {
        this.pointer = pointer;
    }

    get ptr(): number { return this.pointer.ptr }

    check<TReturnType>(success: () => TReturnType, error: () => TReturnType): TReturnType {
        if (this.isError())
            return error();

        return success();
    }

    static usePointer<TReturnType>(func: (exception: number) => TReturnType): TReturnType {
        return Pointer.use(pointer => {
            const result = func(pointer.ptr);

            return Exception.checkException(pointer, result);
        });
    }

    static use<TReturnType>(func: (exception: Exception) => TReturnType): TReturnType {
        return Pointer.use(pointer => {
            const result = func(new Exception(pointer));

            return Exception.checkException(pointer, result);
        });
    }

    private static checkException<TReturnType>(exception: Pointer, result: TReturnType): TReturnType {
        if (!Exception.isRaised(exception))
            return result;

        const severity = Exception.getErrorSeverity(exception.value);
        if (severity >= MagickErrorSeverity.Error)
            Exception.throw(exception, severity);
        else
            Exception.dispose(exception);

        return result;
    }

    private isError() {
        if (!Exception.isRaised(this.pointer))
            return false;

        const severity = Exception.getErrorSeverity(this.pointer.value);
        return severity >= MagickErrorSeverity.Error
    }

    private static getErrorSeverity(exception: number): MagickErrorSeverity {
        return ImageMagick._api._MagickExceptionHelper_Severity(exception) as MagickErrorSeverity;
    }

    private static isRaised(exception: Pointer): boolean {
        return exception.value !== 0;
    }

    private static throw(exception: Pointer, severity: MagickErrorSeverity): void {
        const error = Exception.createError(exception.value, severity);

        Exception.dispose(exception);

        throw error;
    }

    private static createError(exception: number, severity: MagickErrorSeverity): MagickError {
        const errorMessage = Exception.getMessage(exception);
        const error = new MagickError(errorMessage, severity);

        const nestedCount = ImageMagick._api._MagickExceptionHelper_RelatedCount(exception);
        if (nestedCount === 0)
            return error;

        const relatedErrors: MagickError[] = [];
        for (let i = 0; i < nestedCount; i++) {
            const related = ImageMagick._api._MagickExceptionHelper_Related(exception, i);
            const relatedSeverity = Exception.getErrorSeverity(related);
            const relatedError = Exception.createError(related, relatedSeverity);
            relatedErrors.push(relatedError);
        }

        error._setRelatedErrors(relatedErrors);

        return error;
    }

    private static getMessage(exception: number): string {
        const message = ImageMagick._api._MagickExceptionHelper_Message(exception);
        const description = ImageMagick._api._MagickExceptionHelper_Description(exception);

        let errorMessage = _createString(message, 'Unknown error');
        if (description !== 0) {
            errorMessage += `(${ImageMagick._api.UTF8ToString(description)})`;
        }

        return errorMessage;
    }

    private static dispose(exception: Pointer): void {
        ImageMagick._api._MagickExceptionHelper_Dispose(exception.value);
    }
}
