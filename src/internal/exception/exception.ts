/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '../../image-magick';
import { MagickError } from '../../magick-error';
import { MagickErrorSeverity } from '../../enums/magick-error-severity';
import { NativePointer } from '@dlemstra/magick-native';
import { NativePointerPointer } from '../pointer/native-pointer-pointer';
import { _castToSize } from '../native/size';
import { _createString, _createRequiredString } from '../native/string';

/** @internal */
export class Exception {
    private readonly pointer: NativePointerPointer;

    private constructor(pointer: NativePointerPointer) {
        this.pointer = pointer;
    }

    get ptr(): NativePointer { return this.pointer.ptr; }

    check<TReturnType>(success: () => TReturnType, error: () => TReturnType): TReturnType {
        if (this.isError())
            return error();

        return success();
    }

    static usePointer<TReturnType>(func: (exception: NativePointer) => TReturnType, onWarning?: (error: MagickError) => void): TReturnType {
        return NativePointerPointer.use(pointer => {
            const result = func(pointer.ptr);

            return Exception.checkException(pointer, result, onWarning);
        });
    }

    static use<TReturnType>(func: (exception: Exception) => TReturnType, onWarning?: (error: MagickError) => void): TReturnType {
        return NativePointerPointer.use(pointer => {
            const result = func(new Exception(pointer));

            return Exception.checkException(pointer, result, onWarning);
        });
    }

    private static checkException<TReturnType>(exception: NativePointerPointer, result: TReturnType, onWarning?: (error: MagickError) => void): TReturnType {
        if (!Exception.isRaised(exception))
            return result;

        const severity = Exception.getErrorSeverity(exception.value);
        if (severity >= MagickErrorSeverity.Error)
            Exception.throw(exception, severity);
        else if (onWarning !== undefined) {
            const error = Exception.createError(exception.value, severity);
            onWarning(error);
        } else {
            Exception.dispose(exception);
        }

        return result;
    }

    private isError() {
        if (!Exception.isRaised(this.pointer))
            return false;

        const severity = Exception.getErrorSeverity(this.pointer.value);
        return severity >= MagickErrorSeverity.Error
    }

    private static getErrorSeverity(exception: NativePointer): MagickErrorSeverity {
        return ImageMagick._api._MagickExceptionHelper_Severity(exception) as MagickErrorSeverity;
    }

    private static isRaised(exception: NativePointerPointer): boolean {
        return exception.value !== ImageMagick._api._NullPointer;
    }

    private static throw(exception: NativePointerPointer, severity: MagickErrorSeverity): void {
        const error = Exception.createError(exception.value, severity);

        Exception.dispose(exception);

        throw error;
    }

    private static createError(exception: NativePointer, severity: MagickErrorSeverity): MagickError {
        const errorMessage = Exception.getMessage(exception);
        const error = new MagickError(errorMessage, severity);

        const nestedCount = ImageMagick._api._MagickExceptionHelper_RelatedCount(exception);
        if (nestedCount === ImageMagick._api._NullPointer)
            return error;

        const relatedErrors: MagickError[] = [];
        for (let i = 0; i < nestedCount; i++) {
            const related = ImageMagick._api._MagickExceptionHelper_Related(exception, _castToSize(i));
            const relatedSeverity = Exception.getErrorSeverity(related);
            const relatedError = Exception.createError(related, relatedSeverity);
            relatedErrors.push(relatedError);
        }

        error._setRelatedErrors(relatedErrors);

        return error;
    }

    private static getMessage(exception: NativePointer): string {
        const message = ImageMagick._api._MagickExceptionHelper_Message(exception);
        const description = ImageMagick._api._MagickExceptionHelper_Description(exception);

        let errorMessage = _createString(message, 'Unknown error');
        if (description !== ImageMagick._api._NullPointer) {
            errorMessage += `(${_createRequiredString(description)})`;
        }

        return errorMessage;
    }

    private static dispose(exception: NativePointerPointer): void {
        ImageMagick._api._MagickExceptionHelper_Dispose(exception.value);
    }
}
