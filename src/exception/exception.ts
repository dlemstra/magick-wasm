import { MagickNative } from "../../lib/wasm/magick";
import { ExceptionSeverity } from "./exception-severity";
import { Pointer } from "../pointer/pointer";

/** @internal */
export class Exception
{
    static create<TReturnType>(im: MagickNative, func: (exception: number) => TReturnType): TReturnType {
        return Pointer.create(im, (exception) => {
            const result = func(exception.ptr);

            return Exception.checkException(im, exception, result);
        });
    }

    static createWithPointer<TReturnType>(im: MagickNative, func: (exception: Pointer) => TReturnType): TReturnType {
        return Pointer.create(im, (exception) => {
            const result = func(exception);

            return Exception.checkException(im, exception, result);
        });
    }

    static isError(im: MagickNative, exception: Pointer): boolean {
        if (!Exception.isRaised(exception)) {
            return false;
        }

        return Exception.isErrorSeverity(im, exception);
    }

    private static checkException<TReturnType>(im: MagickNative, exception: Pointer, result: TReturnType): TReturnType {
        if (!Exception.isRaised(exception)) {
            return result;
        }

        if (Exception.isErrorSeverity(im, exception)) {
            Exception.throw(im, exception);
        } else {
            Exception.dispose(im, exception);
        }

        return result;

    }

    private static isErrorSeverity(im: MagickNative, exception: Pointer): boolean {
        const severity = im._MagickExceptionHelper_Severity(exception.value) as ExceptionSeverity;
        return severity >= ExceptionSeverity.Error;
    }

    private static isRaised(exception: Pointer): boolean {
        return exception.value !== 0;
    }

    private static throw(im: MagickNative, exception: Pointer): void {
        const errorMessage = Exception.getMessage(im, exception);
        Exception.dispose(im, exception);

        throw errorMessage;
    }

    private static getMessage(im: MagickNative, exception: Pointer): string {
        const message = im._MagickExceptionHelper_Message(exception.value);
        const description = im._MagickExceptionHelper_Description(exception.value);

        let errorMessage = im.UTF8ToString(message);
        if (description !== 0) {
            errorMessage += `(${im.UTF8ToString(description)})`;
        }

        return errorMessage;
    }

    private static dispose(im: MagickNative, exception: Pointer): void {
        im._MagickExceptionHelper_Dispose(exception.value);
    }
}