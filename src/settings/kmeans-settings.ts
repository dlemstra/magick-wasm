/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Class that contains settings for the k-means operation.
 */
export class KmeansSettings {
    /**
     * Gets or sets the seed clusters from a color list (for example, "red;green;blue").
     */
    seedColors?: string;

    /**
     * Gets or sets the number of colors to use as seeds.
     */
    numberColors = 0;

    /**
     * Gets or sets the maximum number of iterations while converging.
     */
    maxIterations = 100;

    /**
     * Gets or sets the maximum tolerance.
     */
    tolerance = 0.01;
}
