import { Exception } from "./exception/exception";
import { Pointer } from "./pointer/pointer";

export abstract class NativeInstance {
    private readonly disposeMethod: (instance: number) => void;
    private pointer: number;

    /** @internal */
    protected constructor(instance: number, disposeMethod: (instance: number) => void) {
        this.pointer = instance;
        this.disposeMethod = disposeMethod;
    }

    get instance(): number {
        if (this.pointer > 0)
            return this.pointer;

        if (this.pointer === -1)
            this._instanceNotInitialized();

        throw new Error('instance is disposed');
    }

    dispose(): void {
        this.pointer = this.disposeInstance(this.pointer);
    }

    /** @internal */
    protected _setInstance(pointer: number, exception: Pointer): void {
        if (Exception.isError(exception)) {
            this.disposeInstance(pointer);
            return;
        }

        this.dispose();
        this.pointer = pointer;
    }

    /** @internal */
    protected _instanceNotInitialized(): void {
        throw new Error('instance is not initialized');
    }

    private disposeInstance(pointer: number): number {
        if (pointer > 0)
            this.disposeMethod(pointer);

        return 0;
    }
}