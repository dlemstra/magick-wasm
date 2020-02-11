import { Exception } from "./exception/exception";
import { Pointer } from "./pointer/pointer";

/** @internal */
export abstract class NativeInstance
{
    private readonly disposeMethod: (instance: number) => void;
    private pointer: number;

    protected constructor(instance: number, disposeMethod: (instance: number) => void) {
        this.pointer = instance;
        this.disposeMethod = disposeMethod;
    }

    get instance(): number {
        if (this.pointer === 0) {
            throw new Error('instance is disposed.');
        }

        return this.pointer;
    }

    dispose(): void {
        this.pointer = this.disposeInstance(this.pointer);
    }

    protected setInstance(pointer: number, exception: Pointer): void {
        if (Exception.isError(exception)) {
            this.disposeInstance(pointer);
            return;
        }

        this.dispose();
        this.pointer = pointer;
    }

    private disposeInstance(pointer: number): number {
        if (pointer !== 0)
            this.disposeMethod(pointer);

        return 0;
    }
}