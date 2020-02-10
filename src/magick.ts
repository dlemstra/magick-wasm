import { nativeApi } from "./image-magick";
import { LogEvents } from "./log-events";
import { withString } from "./util/string";

export type logDelegate = (type: LogEvents, message: string) => void;

export class Magick
{
    private static LogDelegate = 0;
    private static LogDelegates: logDelegate[] = [];

    static get delegates(): string { return nativeApi().UTF8ToString(nativeApi()._Magick_Delegates_Get()); }

    static get features(): string { return nativeApi().UTF8ToString(nativeApi()._Magick_Features_Get()).slice(0, -1); }

    static get imageMagickVersion(): string { return nativeApi().UTF8ToString(nativeApi()._Magick_ImageMagickVersion_Get()); }

    static setRandomSeed = (seed: number): void => nativeApi()._Magick_SetRandomSeed(seed);

    static logEvents(logEvents: LogEvents, func: logDelegate): void {
        Magick.LogDelegates.push(func);
        if (Magick.LogDelegate === 0) {
            Magick.LogDelegate = nativeApi().addFunction((type: number, ptr: number) => Magick.onLog(type, ptr), 'vii');
            nativeApi()._Magick_SetLogDelegate(Magick.LogDelegate);

            const eventNames = Magick.getEventNames(logEvents);
            withString(eventNames, (events: number) => {
                nativeApi()._Magick_SetLogEvents(events);
            });
        }
    }

    private static onLog(type: number, ptr: number): void {
        const message = nativeApi().UTF8ToString(ptr);
        Magick.LogDelegates.forEach((delegate) => {
            delegate(type, message);
        });
    }

    private static getEventNames(logEvents: LogEvents): string {
        if (logEvents === LogEvents.All)
            return 'All,Trace'

        if (logEvents === LogEvents.Detailed)
            return 'All'

        const values = [];
        for (const value of Object.keys(LogEvents).map(item => Number(item)).filter(item => !isNaN(item) && item > 0))
        {
            if ((value & logEvents) === value)
                values.push(LogEvents[value]);
        }

        return values.join(',');
    }
}