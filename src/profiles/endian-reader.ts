/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/** @internal */
export class EndianReader {
    private readonly _data: Uint8Array;
    private _index;

    constructor(data: Uint8Array) {
        this._data = data;
        this._index = 0;
        this.isLittleEndian = false;
    }

    public get index(): number { return this._index; }

    public isLittleEndian: boolean;

    public readLong(): number | null {
        if (!this.canRead(4))
            return null;

        return this.isLittleEndian ? this.readLongLSB() : this.readLongMSB();
    }

    public readString(length: number): string | null {
        if (length == 0)
            return '';

        if (!this.canRead(length))
            return null;

        const decoder = new TextDecoder('utf-8');
        let result = decoder.decode(this._data.subarray(this._index, this._index + length));

        const nullCharIndex = result.indexOf('\0');
        if (nullCharIndex != -1)
            result = result.substring(0, nullCharIndex);

        this._index += length;

        return result;
    }

    public seek(index: number): boolean {
        if (index >= this._data.length)
            return false;

        this._index = index;

        return true;
    }

    public skip(value: number): boolean {
        if (this._index + value >= this._data.length)
            return false;

        this._index += value;

        return true;
    }

    private canRead(length: number): boolean {
        if (length > this._data.length)
            return false;

        return this._index + length <= this._data.length;
    }

    private readLongLSB(): number {
        let result = this._data[this._index];
        result |= this._data[this._index + 1] << 8;
        result |= this._data[this._index + 2] << 16;
        result |= this._data[this._index + 3] << 24;

        this._index += 4;

        return result;
    }

    private readLongMSB(): number {
        let result = this._data[this._index] << 24;
        result |= this._data[this._index + 1] << 16;
        result |= this._data[this._index + 2] << 8;
        result |= this._data[this._index + 3];

        this._index += 4;

        return result;
    }
}
