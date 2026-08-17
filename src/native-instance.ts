/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Exception } from './internal/exception/exception';
import { ImageMagick } from './image-magick';
import { MagickError } from './magick-error';
import { NativePointer } from '@dlemstra/magick-native';

export abstract class NativeInstance {
    private readonly disposeMethod: (instance: NativePointer) => void;
    private instance: NativePointer;

    protected onDispose?(): void;

    /** @internal */
    protected constructor(instance: NativePointer, disposeMethod: (instance: NativePointer) => void) {
        this.instance = instance;
        this.disposeMethod = disposeMethod;
    }

    /** @internal */
    get _instance(): NativePointer {
        if (this.instance !== ImageMagick._api._NullPointer)
            return this.instance;

        throw new MagickError('instance is disposed');
    }
    /** @internal */
    set _instance(instance: NativePointer) {
        this.disposeInstance(this.instance);
        this.instance = instance;
    }

    dispose(): void {
        this.instance = this.disposeInstance(this.instance);
    }

    /** @internal */
    protected _setInstance(instance: NativePointer, exception: Exception): boolean {
        return exception.check(() => {
            if (this.instance === ImageMagick._api._NullPointer)
                return false;

            this.dispose();
            this.instance = instance;
            return true;
        }, () => {
            this.disposeInstance(instance);
            return true;
        });
    }

    private disposeInstance(instance: NativePointer): NativePointer {
        if (instance > 0) {
            if (this.onDispose !== undefined)
                this.onDispose();
            this.disposeMethod(instance);
        }

        return ImageMagick._api._NullPointer;
    }
}
