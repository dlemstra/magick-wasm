// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickError } from './magick-error';
import { Exception } from './internal/exception/exception';

export interface INativeInstance {
    dispose(): void;
}

export abstract class NativeInstance implements INativeInstance {
    private readonly disposeMethod: (instance: number) => void;
    private instance: number;

    /** @internal */
    protected constructor(instance: number, disposeMethod: (instance: number) => void) {
        this.instance = instance;
        this.disposeMethod = disposeMethod;
    }

    /** @internal */
    get _instance(): number {
        if (this.instance > 0)
            return this.instance;

        if (this.instance === -1)
            this._instanceNotInitialized();

        throw new MagickError('instance is disposed');
    }
    /** @internal */
    set _instance(instance: number) {
        this.disposeInstance(this.instance);
        this.instance = instance;
    }

    dispose(): void {
        this.instance = this.disposeInstance(this.instance);
    }

    /** @internal */
    protected _setInstance(instance: number, exception: Exception): void {
        exception.check(() => {
            this.dispose();
            this.instance = instance;
        }, () => {
            this.disposeInstance(instance);
        });
    }

    /** @internal */
    protected _instanceNotInitialized(): void {
        throw new MagickError('instance is not initialized');
    }

    private disposeInstance(instance: number): number {
        if (instance > 0)
            this.disposeMethod(instance);

        return 0;
    }
}
