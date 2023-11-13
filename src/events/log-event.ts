// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { LogEventTypes } from '../enums/log-event-types';

export class LogEvent {
    /**
     * Initializes a new instance of the {@link LogEvent} class.
     * @param eventType - The type of the log message.
     * @param message - The log message.
     */
    constructor(eventType: LogEventTypes, message?: string) {
        this.eventType = eventType;
        this.message = message ?? '';
    }

    /**
     * Gets the type of the log message.
     */
    readonly eventType: LogEventTypes;

    /**
     * Gets the log message.
     */
    readonly message: string;
}
