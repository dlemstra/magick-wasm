// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

export interface IDisposable {
    dispose(): void;
}

/** @internal */
export class Disposable {
    static _disposeAfterExecution<TInstanceType extends IDisposable, TReturnType>(instance: TInstanceType, func: (instance: TInstanceType) => TReturnType): TReturnType;
    static _disposeAfterExecution<TInstanceType extends IDisposable, TReturnType>(instance: TInstanceType, func: (instance: TInstanceType) => Promise<TReturnType>): Promise<TReturnType>;
    static _disposeAfterExecution<TInstanceType extends IDisposable, TReturnType>(instance: TInstanceType, func: (instance: TInstanceType) => TReturnType | Promise<TReturnType>): TReturnType | Promise<TReturnType> {
        try {
            const result = func(instance);
            if (result instanceof Promise) {
                return Promise.resolve(result).then(resolvedResult => {
                    instance.dispose();
                    return resolvedResult;
                });
            } else {
                instance.dispose();
                return result;
            }
        } catch (error) {
            instance.dispose();
            throw(error);
        }
    }
}
