// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IDefine } from './define';

/**
 * Interface for an object that specifies defines for an image.
 */
export interface IDefines {
    /**
     * Gets the defines that should be set as a define on an image.
     */
    getDefines(): IDefine[];
}
