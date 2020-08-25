/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from "../image-magick";
import { ExceptionSeverity } from "./exception-severity";
import { Pointer } from "../pointer/pointer";
import { _createString } from "../native/string";

/** @internal */
export class Exception {
    private readonly pointer: Pointer;

    private constructor(pointer: Pointer) {
        this.pointer = pointer;
    }

    get ptr(): number { return this.pointer.ptr }

    check<TReturnType>(success: () => TReturnType, error: () => TReturnType): TReturnType {
        if (Exception.isRaised(this.pointer) && Exception.isErrorSeverity(this.pointer))
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

        if (Exception.isErrorSeverity(exception))
            Exception.throw(exception);
        else
            Exception.dispose(exception);

        return result;
    }

    private static isErrorSeverity(exception: Pointer): boolean {
        const severity = ImageMagick._api._MagickExceptionHelper_Severity(exception.value) as ExceptionSeverity;
        return severity >= ExceptionSeverity.Error;
    }

    private static isRaised(exception: Pointer): boolean {
        return exception.value !== 0;
    }

    private static throw(exception: Pointer): void {
        const errorMessage = Exception.getMessage(exception);
        Exception.dispose(exception);

        throw new Error(errorMessage);
    }

    private static getMessage(exception: Pointer): string {
        const message = ImageMagick._api._MagickExceptionHelper_Message(exception.value);
        const description = ImageMagick._api._MagickExceptionHelper_Description(exception.value);

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