import { MagickNative } from "../../lib/wasm/magick";
import { ExceptionSeverity } from "./exception-severity";
import { Pointer } from "../pointer/pointer";

/** @internal */
export class Exception
{
    static create<TReturnType>(im: MagickNative, func: (exception: number) => TReturnType) {
        return Pointer.create(im, (exception) => {
            const result = func(exception.ptr);

            if (Exception.shouldThrow(im, exception)) {
                Exception.throw(im, exception);
            }

            return result;
        });
    }

    private static shouldThrow(im: MagickNative, exception: Pointer) {
        if (exception.value !== 0) {
            const severity = <ExceptionSeverity>im._MagickExceptionHelper_Severity(exception.value);
            if (severity >= ExceptionSeverity.Error) {
                return true;
            }
        }

        return false;
    }

    private static throw(im: MagickNative, exception: Pointer) {
        const errorMessage = Exception.getMessage(im, exception);
        im._MagickExceptionHelper_Dispose(exception.value);

        throw errorMessage;
    }

    private static getMessage(im: MagickNative, exception: Pointer) {
        const message = im._MagickExceptionHelper_Message(exception.value);
        const description = im._MagickExceptionHelper_Description(exception.value);

        let errorMessage = im.UTF8ToString(message);
        if (description !== 0) {
            errorMessage += `(${im.UTF8ToString(description)})`;
        }

        return errorMessage;
    }
}