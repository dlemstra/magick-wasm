// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { LogEvent } from "../events/log-event";
import { LogEventTypes } from "../enums/log-event-types";
import { IMagickImage } from "../magick-image";
import { ImageMagick } from "../image-magick";
import { ProgressEvent } from "../events/progress-event";
import { _createString } from "../internal/native/string";

/** @internal */
export class DelegateRegistry {
    private static _logDelegate: number = 0;
    private static _onLog?: ((event: LogEvent) => void);
    private static _progressDelegate: number = 0;
    private static _images: Record<number, IMagickImage> = {};

    static setLogDelegate(logDelegate?: ((event: LogEvent) => void)): void {
        if (DelegateRegistry._logDelegate === 0 && logDelegate !== undefined)
            DelegateRegistry._logDelegate = ImageMagick._api.addFunction(DelegateRegistry.logDelegate, 'vii');

        ImageMagick._api._Magick_SetLogDelegate(logDelegate === undefined ? 0 : DelegateRegistry._logDelegate);

        DelegateRegistry._onLog = logDelegate;
    }

    static setProgressDelegate(image: IMagickImage): void {
        if (DelegateRegistry._progressDelegate === 0)
            this._progressDelegate = ImageMagick._api.addFunction(DelegateRegistry.progressDelegate, 'iijji');

        this._images[image._instance] = image;
        ImageMagick._api._MagickImage_SetClientData(image._instance, image._instance);
        ImageMagick._api._MagickImage_SetProgressDelegate(image._instance, DelegateRegistry._progressDelegate);
    }

    static removeProgressDelegate(image: IMagickImage): void {
        ImageMagick._api._MagickImage_SetClientData(image._instance, 0);
        ImageMagick._api._MagickImage_SetProgressDelegate(image._instance, 0);
        delete DelegateRegistry._images[image._instance];
    }

    private static logDelegate(eventType: number, messageInstance: number): void {
        if (DelegateRegistry._onLog === undefined)
            return;

        const message = _createString(messageInstance, '');
        DelegateRegistry._onLog(new LogEvent(<LogEventTypes>eventType, message));
    }

    private static progressDelegate(originInstance: number, offsetBigInt: bigint, extentBigInt: bigint, userData: number): number {
        const image = DelegateRegistry._images[userData];
        if (image === undefined || image.onProgress === undefined)
            return 1;

        const offset = Number(offsetBigInt);
        const extent = Number(extentBigInt);

        const origin = _createString(originInstance);
        const progressEvent = new ProgressEvent(origin, offset, extent);
        image.onProgress(progressEvent);
        return progressEvent.cancel ? 0 : 1;
    }
}
