/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Exception } from './internal/exception/exception';
import { ImageMagick } from './image-magick';

/**
 * Class that can be used to set the limits to the resources that are being used.
 */
export class ResourceLimits {
    /**
     * Gets the maximum width * height of an image that can reside in the pixel cache memory.
     * Images that exceed the area limit are cached to disk.
     */
    static get area(): bigint {
        return ImageMagick._api._ResourceLimits_Area_Get();
    }

    /**
     * Sets the maximum width * height of an image that can reside in the pixel cache memory.
     * Images that exceed the area limit are cached to disk.
     */
    static set area(value: bigint) {
        ImageMagick._api._ResourceLimits_Area_Set(value);
    }

    /**
     * Gets the pixel cache limit in bytes. Requests for memory above this limit will fail.
     */
    static get disk(): bigint {
        return ImageMagick._api._ResourceLimits_Disk_Get();
    }

    /**
     * Sets the pixel cache limit in bytes. Requests for memory above this limit will fail.
     */
    static set disk(value: bigint) {
        ImageMagick._api._ResourceLimits_Disk_Set(value);
    }

    /**
     * Gets the maximum height of an image.
     */
    static get height(): bigint {
        return ImageMagick._api._ResourceLimits_Height_Get();
    }

    /**
     * Sets the maximum height of an image.
     */
    static set height(value: bigint) {
        ImageMagick._api._ResourceLimits_Height_Set(value);
    }

    /**
     * Gets the maximum number of images in an image list.
     */
    static get listLength(): bigint {
        return ImageMagick._api._ResourceLimits_ListLength_Get();
    }

    /**
     * Sets the maximum number of images in an image list.
     */
    static set listLength(value: bigint) {
        ImageMagick._api._ResourceLimits_ListLength_Set(value);
    }

    /**
     * Gets the max memory request in bytes. ImageMagick maintains a separate memory pool for large
     * resource requests. If the limit is exceeded when allocating pixels, the allocation is
     * instead memory-mapped
     */
    static get maxMemoryRequest(): bigint {
        return ImageMagick._api._ResourceLimits_MaxMemoryRequest_Get();
    }

    /**
     * Sets the max memory request in bytes. ImageMagick maintains a separate memory pool for large
     * resource requests. If the limit is exceeded when allocating pixels, the allocation is
     * instead memory-mapped
     */
    static set maxMemoryRequest(value: bigint) {
        Exception.usePointer(exception => {
            ImageMagick._api._ResourceLimits_MaxMemoryRequest_Set(value, exception);
        });
    }

    /**
     * Gets the max size of a profile in bytes that can be added to the image.
     */
    static get maxProfileSize(): bigint {
        return ImageMagick._api._ResourceLimits_MaxProfileSize_Get();
    }

    /**
     * Sets the max size of a profile in bytes that can be added to the image.
     */
    static set maxProfileSize(value: bigint) {
        Exception.usePointer(exception => {
            ImageMagick._api._ResourceLimits_MaxProfileSize_Set(value, exception);
        });
    }

    /**
     * Gets the pixel cache limit in bytes. Once this memory limit is exceeded, all subsequent pixels cache
     * operations are to/from disk.
     */
    static get memory(): bigint {
        return ImageMagick._api._ResourceLimits_Memory_Get();
    }

    /**
     * Sets the pixel cache limit in bytes. Once this memory limit is exceeded, all subsequent pixels cache
     * operations are to/from disk.
     */
    static set memory(value: bigint) {
        ImageMagick._api._ResourceLimits_Memory_Set(value);
    }

    /**
     * Gets or sets the maximum number of seconds that the process is permitted to execute.
     * Exceed this limit and an exception is thrown and processing stops.
     */
    static get time(): bigint {
        return ImageMagick._api._ResourceLimits_Time_Get();
    }

    /**
     * Sets or sets the maximum number of seconds that the process is permitted to execute.
     * Exceed this limit and an exception is thrown and processing stops.
     */
    static set time(value: bigint) {
        ImageMagick._api._ResourceLimits_Time_Set(value);
    }

    /**
     * Gets the maximum width of an image.
     */
    static get width(): bigint {
        return ImageMagick._api._ResourceLimits_Width_Get();
    }

    /**
     * Sets the maximum height of an image.
     */
    static set width(value: bigint) {
        ImageMagick._api._ResourceLimits_Width_Set(value);
    }
}
