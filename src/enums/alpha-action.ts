/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

/**
 * Specifies alpha actions.
 */
export const AlphaAction = {
    /**
     * Undefined.
     */
    Undefined: 0,

    /**
     * Enable the image's transparency channel. Note that normally Set should be used instead of
     * this, unless you specifically need to preserve the existing (but specifically turned Off)
     * transparency channel.
     */
    Activate: 1,

    /**
     * Associate the alpha channel with the image.
     */
    Associate: 2,

    /**
     * Set any fully-transparent pixel to the background color, while leaving it fully-transparent.
     * This can make some image file formats, such as PNG, smaller as the RGB values of transparent
     * pixels are more uniform, and thus can compress better.
     */
    Background: 3,

    /**
     * Turns 'On' the alpha/matte channel, then copies the grayscale intensity of the image, into
     * the alpha channel, converting a grayscale mask into a transparent shaped mask ready to be
     * colored appropriately. The color channels are not modified.
     */
    Copy: 4,

    /**
     * Disables the image's transparency channel. This does not delete or change the existing data,
     * it just turns off the use of that data.
     */
    Deactivate: 5,

    /**
     * Discrete.
     */
    Discrete: 6,

    /**
     * Disassociate the alpha channel from the image.
     */
    Disassociate: 7,

    /**
     * Copies the alpha channel values into all the color channels and turns 'Off' the image's
     * transparency, so as to generate a grayscale mask of the image's shape. The alpha channel
     * data is left intact just deactivated. This is the inverse of 'Copy'.
     */
    Extract: 8,

    /**
     * Off.
     */
    Off: 9,

    /**
    * On.
    */
    On: 10,

    /**
     * Enables the alpha/matte channel and forces it to be fully opaque.
     */
    Opaque: 11,

    /**
     * Composite the image over the background color.
     */
    Remove: 12,

    /**
     * Activates the alpha/matte channel. If it was previously turned off then it also
     * resets the channel to opaque. If the image already had the alpha channel turned on,
     * it will have no effect.
     */
    Set: 13,

    /**
     * As per 'Copy' but also colors the resulting shape mask with the current background color.
     * That is the RGB color channels is replaced, with appropriate alpha shape.
     */
    Shape: 14,

    /**
     * Activates the alpha/matte channel and forces it to be fully transparent. This effectively
     * creates a fully transparent image the same size as the original and with all its original
     * RGB data still intact, but fully transparent.
    */
    Transparent: 15,

    /**
     * Removes the alpha channel when the alpha value is opaque for all pixels.
     */
    OffIfOpaque: 16
} as const;

export type AlphaAction = typeof AlphaAction[keyof typeof AlphaAction];
