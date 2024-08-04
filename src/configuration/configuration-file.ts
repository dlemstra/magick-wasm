/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Interface that represents a configuration file.
 */
export interface IConfigurationFile {
    /**
     * Gets the file name.
     */
    readonly fileName: string;

    /**
     * Gets or sets the data of the configuration file.
     */
    data: string;
}

/** @internal */
export class ConfigurationFile implements IConfigurationFile {
    public readonly fileName: string;
    public data: string;

    public constructor(fileName: string, data: string) {
        this.fileName = fileName;
        this.data = data;
    }
}
