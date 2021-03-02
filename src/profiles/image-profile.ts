/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

export class ImageProfile {
    private _name: string;
    private _data: Uint8Array;

    constructor(name: string, data: Uint8Array) {
        this._name = name;
        this._data = data;
    }

    get name(): string { return this._name; }

    getData(): Uint8Array {
        return this._data;
    }
}