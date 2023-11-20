// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Percentage } from "../types/percentage";

/**
 * Class for Progress events.
 */
export class ProgressEvent {
    /** @internal */
    constructor(origin: string | null, offset: number, extent: number) {
        this.origin = origin;
        this.progress = new Percentage((offset + 1) / (extent * 100.0));
    }

    /**
     * Gets the originator of this event.
     */
    readonly origin: string | null;

    /**
     * Gets the progress percentage.
     */
    readonly progress: Percentage;

    /**
     * Gets or sets a value indicating whether the current operation will be canceled.
     */
    cancel: boolean = false;
}
