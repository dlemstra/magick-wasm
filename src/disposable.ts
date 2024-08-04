/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Interface that can be used to dispose unmanaged resources.
 */
export interface IDisposable {
    /**
     * Disposes the unmanaged resources.
     */
    dispose(): void;
}
