// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.
import { MagickConstants } from '@dlemstra/magick-native/magick.constants';
import { ConfigurationFile, IConfigurationFile } from './configuration-file';

/**
 * Interface that represents a configuration files.
 */
export interface IConfigurationFiles {
    /**
     * Gets all the configuration files.
     */
    all(): Generator<IConfigurationFile>;

    /// <summary>
    /// Gets the policy configuration.
    /// </summary>
    readonly log: IConfigurationFile

    /// <summary>
    /// Gets the policy configuration.
    /// </summary>
    readonly policy: IConfigurationFile
}

/**
 * Encapsulates the configuration files of ImageMagick.
 */
export class ConfigurationFiles implements IConfigurationFiles {
    private constructor() {
        this.log = new ConfigurationFile('log.xml', MagickConstants.XmlResourceFiles.log);
        this.policy = new ConfigurationFile('policy.xml', MagickConstants.XmlResourceFiles.policy);
    }

    /**
     * Gets the default configuration.
     */
    public static default: IConfigurationFiles = new ConfigurationFiles();

    /**
     * Gets all the configuration files.
     */
    public *all(): Generator<IConfigurationFile> {
        yield this.log;
        yield this.policy;
    }

    /// <summary>
    /// Gets the log configuration.
    /// </summary>
    public readonly log: IConfigurationFile;

    /// <summary>
    /// Gets the policy configuration.
    /// </summary>
    public readonly policy: IConfigurationFile;
}
