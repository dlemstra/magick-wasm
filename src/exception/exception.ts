import { MagickNative } from "../../lib/wasm/magick";
import { ExceptionSeverity } from "./exception-severity";
import { Pointer } from "../pointer/pointer";

/** @internal */
export class Exception
{
    static create<TReturnType>(im: MagickNative, func: (exception: number) => TReturnType): TReturnType {
        return Pointer.create(im, (exception) => {
            const result = func(exception.ptr);

            if (Exception.shouldThrow(im, exception)) {
                Exception.throw(im, exception);
            }

            return result;
        });
    }

    private static shouldThrow(im: MagickNative, exception: Pointer): boolean {
        if (exception.value !== 0) {
            const severity = im._MagickExceptionHelper_Severity(exception.value) as ExceptionSeverity;
            if (severity >= ExceptionSeverity.Error) {
                return true;
            }

            Exception.dispose(im, exception);
        }

        return false;
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