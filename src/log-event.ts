// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { LogEventTypes } from './log-event-types';

export class LogEvent {
    eventType: LogEventTypes;
    message: string;

    constructor(eventType: LogEventTypes, message?: string) {
        this.eventType = eventType;
        this.message = message ?? '';
    }
}
