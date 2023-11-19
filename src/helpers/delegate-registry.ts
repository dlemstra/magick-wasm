// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { LogEvent } from "../events/log-event";
import { LogEventTypes } from "../enums/log-event-types";
import { ImageMagick } from "../image-magick";
import { _createString } from "../internal/native/string";

/** @internal */
export class DelegateRegistry {
    private static _logDelegate: number = 0;
    private static _onLog?: ((event: LogEvent) => void);

    static setLogDelegate(logDelegate?: ((event: LogEvent) => void)): void {
        if (logDelegate !== undefined && DelegateRegistry._logDelegate === 0) {
            DelegateRegistry._logDelegate = ImageMagick._api.addFunction(DelegateRegistry.logDelegate, 'vii');
        }

        ImageMagick._api._Magick_SetLogDelegate(logDelegate === undefined ? 0 : DelegateRegistry._logDelegate);

        DelegateRegistry._onLog = logDelegate;
    }

    private static logDelegate(eventType: number, message: number): void {
        if (DelegateRegistry._onLog === undefined)
            return;

        DelegateRegistry._onLog(new LogEvent(eventType as LogEventTypes, _createString(message, '')));
    }
}
