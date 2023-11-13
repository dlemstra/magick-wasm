// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/**
 * Interface that describes an image profile.
 */
export interface IImageProfile {
    /**
     * Gets the name of the profile.
     */
    readonly name: string;

    /**
     * Returns the byte array of this profile.
     */
    getData(): Uint8Array;
}

export class ImageProfile implements IImageProfile {
    private _data: Uint8Array;

    constructor(name: string, data: Uint8Array) {
        this.name = name;
        this._data = data;
    }

    readonly name: string;

    getData(): Uint8Array {
        return this._data;
    }
}
