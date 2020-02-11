import { nativeApi } from "../image-magick";
import { ExceptionSeverity } from "./exception-severity";
import { Pointer } from "../pointer/pointer";

/** @internal */
export class Exception
{
    static use<TReturnType>(func: (exception: number) => TReturnType): TReturnType {
        return Pointer.use((pointer) => {
            const result = func(pointer.ptr);

            return Exception.checkException(pointer, result);
        });
    }

    static useWithPointer<TReturnType>(func: (exception: Pointer) => TReturnType): TReturnType {
        return Pointer.use((pointer) => {
            const result = func(pointer);

            return Exception.checkException(pointer, result);
        });
    }

    static isError(exception: Pointer): boolean {
        if (!Exception.isRaised(exception)) {
            return false;
        }

        return Exception.isErrorSeverity(exception);
    }

    private static checkException<TReturnType>(exception: Pointer, result: TReturnType): TReturnType {
        if (!Exception.isRaised(exception)) {
            return result;
        }

        if (Exception.isErrorSeverity(exception)) {
            Exception.throw(exception);
        } else {
            Exception.dispose(exception);
        }

        return result;

    }

    private static isErrorSeverity(exception: Pointer): boolean {
        const severity = nativeApi()._MagickExceptionHelper_Severity(exception.value) as ExceptionSeverity;
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
        const message = nativeApi()._MagickExceptionHelper_Message(exception.value);
        const description = nativeApi()._MagickExceptionHelper_Description(exception.value);

        let errorMessage = nativeApi().UTF8ToString(message);
        if (description !== 0) {
            errorMessage += `(${nativeApi().UTF8ToString(description)})`;
        }

        return errorMessage;
    }

    private static dispose(exception: Pointer): void {
        nativeApi()._MagickExceptionHelper_Dispose(exception.value);
    }
}