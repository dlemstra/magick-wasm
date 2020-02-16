import { Exception } from "./exception/exception";

export abstract class NativeInstance {
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

        throw new Error('instance is disposed');
    }

    dispose(): void {
        this.instance = this.disposeInstance(this.instance);
    }

    /** @internal */
    protected _setInstance(instance: number, exception: Exception): void {
        if (Exception.disposedInstance(exception, instance, this.disposeMethod)) {
            this.disposeInstance(instance);
            return;
        }

        this.dispose();
        this.instance = instance;
    }

    /** @internal */
    protected _instanceNotInitialized(): void {
        throw new Error('instance is not initialized');
    }

    private disposeInstance(instance: number): number {
        if (instance > 0)
            this.disposeMethod(instance);

        return 0;
    }
}