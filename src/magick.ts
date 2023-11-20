// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DelegateRegistry } from './helpers/delegate-registry';
import { ImageMagick } from './image-magick';
import { LogEvent } from './events/log-event';
import { MagickFormatInfo, IMagickFormatInfo } from './magick-format-info';
import { LogEventTypes } from './enums/log-event-types';
import { _createString, _withString } from './internal/native/string';

/**
 * Interface that represents Magick.
 */
export class Magick {
    /**
     * Gets the ImageMagick delegate libraries.
     */
    static get delegates(): string { return _createString(ImageMagick._api._Magick_Delegates_Get(), 'Unknown'); }

    /**
     * Gets the ImageMagick features.
     */
    static get features(): string { return _createString(ImageMagick._api._Magick_Features_Get(), ' ').slice(0, -1); }

    /**
     * Gets the ImageMagick version.
     */
    static get imageMagickVersion(): string { return _createString(ImageMagick._api._Magick_ImageMagickVersion_Get(), 'Unknown'); }

    /**
     * Gets information about the supported formats.
     */
    static get supportedFormats(): ReadonlyArray<IMagickFormatInfo> { return MagickFormatInfo.all; }

    /**
     * Function that will be executed when something is logged by ImageMagick.
     */
    static onLog?: (event: LogEvent) => void

    /**
     * Registers a font.
     * @param name - The name of the font.
     * @param data - The byte array containing the font.
     */
    static addFont(name: string, data: Uint8Array): void {
        const fileSystem = ImageMagick._api.FS;
        const stats = fileSystem.analyzePath('/fonts');
        if (!stats.exists) {
            fileSystem.mkdir('/fonts');
        }

        const stream = fileSystem.open(`/fonts/${name}`, 'w');
        fileSystem.write(stream, data, 0, data.length);
        fileSystem.close(stream);
    }

    /**
     * Sets the pseudo-random number generator secret key.
     * @param seed - The secret key.
     */
    static setRandomSeed = (seed: number): void => ImageMagick._api._Magick_SetRandomSeed(seed);

    /**
     * Set the events that will be written to the log. The log will be written to the Log event
     * and the debug window in VisualStudio. To change the log settings you must use a custom
     * log.xml file.
     * @param eventTypes - The events that should be logged.
     */
    static setLogEvents(eventTypes: LogEventTypes): void {
        const logDelegate = eventTypes == LogEventTypes.None ? undefined : Magick.logDelegate;
        DelegateRegistry.setLogDelegate(logDelegate);

        const eventTypeString = Magick.getEventTypeString(eventTypes);
        _withString(eventTypeString, instance => ImageMagick._api._Magick_SetLogEvents(instance));
    }

    /** @internal */
    static _getFontFileName(name: string): string {
        const fileName = `/fonts/${name}`;
        const stats = ImageMagick._api.FS.analyzePath(fileName);
        if (!stats.exists) {
            throw `Unable to find a font with the name '${name}', add it with Magick.addFont.`
        }

        return fileName;
    }

    private static getEventTypeString(eventType: LogEventTypes): string {
        if (eventType == LogEventTypes.All)
            return 'All,Trace';
        else if (eventType == LogEventTypes.Detailed)
            return 'All';
        else switch (eventType) {
            case LogEventTypes.Accelerate: return 'Accelerate';
            case LogEventTypes.Annotate: return 'Annotate';
            case LogEventTypes.Blob: return 'Blob';
            case LogEventTypes.Cache: return 'Cache';
            case LogEventTypes.Coder: return 'Coder';
            case LogEventTypes.Configure: return 'Configure';
            case LogEventTypes.Deprecate: return 'Deprecate';
            case LogEventTypes.Draw: return 'Draw';
            case LogEventTypes.Exception: return 'Exception';
            case LogEventTypes.Image: return 'Image';
            case LogEventTypes.Locale: return 'Locale';
            case LogEventTypes.Module: return 'Module';
            case LogEventTypes.Pixel: return 'Pixel';
            case LogEventTypes.Policy: return 'Policy';
            case LogEventTypes.Resource: return 'Resource';
            case LogEventTypes.Trace: return 'Trace';
            case LogEventTypes.Transform: return 'Transform';
            case LogEventTypes.User: return 'User';
            case LogEventTypes.Wand: return 'Wand';
            case LogEventTypes.None:
            default:
                return 'None';
        }
    }

    private static logDelegate(event: LogEvent): void {
        if (Magick.onLog === undefined)
            return;

        Magick.onLog(event);
    }
}
