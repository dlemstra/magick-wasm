// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from './image-magick';
import { LogEvent } from './log-event';
import { MagickFormatInfo } from './magick-format-info';
import { LogEventTypes } from './log-event-types';
import { _createString, _withString } from './internal/native/string';

export class Magick {
    private static _logDelegate?: number;

    static get delegates(): string { return _createString(ImageMagick._api._Magick_Delegates_Get(), 'Unknown'); }

    static get features(): string { return _createString(ImageMagick._api._Magick_Features_Get(), ' ').slice(0, -1); }

    static get imageMagickVersion(): string { return _createString(ImageMagick._api._Magick_ImageMagickVersion_Get(), 'Unknown'); }

    static get supportedFormats(): ReadonlyArray<MagickFormatInfo> { return MagickFormatInfo.all; }

    static onLog?: (event: LogEvent) => void

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

    static setRandomSeed = (seed: number): void => ImageMagick._api._Magick_SetRandomSeed(seed);

    static setLogEvents(eventTypes: LogEventTypes): void {
        if (Magick._logDelegate === undefined) {
            Magick._logDelegate = ImageMagick._api.addFunction(Magick.logDelegate, 'vii');
            ImageMagick._api._Magick_SetLogDelegate(Magick._logDelegate);
        }

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

    private static logDelegate(eventType: number, message: number): void {
        if (Magick.onLog === undefined)
            return;

        Magick.onLog(new LogEvent(eventType as LogEventTypes, _createString(message, '')));
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
}
