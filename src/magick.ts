import { MagickNative } from "../lib/wasm/magick";
import { LogEvents } from "./log-events";
import { withString } from "./util/string";

export type logDelegate = (type: LogEvents, message: string) => void;

export class Magick
{
    private logDelegate: number = 0;
    private logDelegates: logDelegate[] = [];

    private constructor(private im : MagickNative) {}

    /** @internal */
    static create = (im: MagickNative) => new Magick(im);

    get delegates() { return this.im.UTF8ToString(this.im._Magick_Delegates_Get()); }

    get features() { return this.im.UTF8ToString(this.im._Magick_Features_Get()); }

    get imageMagickVersion() { return this.im.UTF8ToString(this.im._Magick_ImageMagickVersion_Get()); }

    setRandomSeed = (seed: number) => this.im._Magick_SetRandomSeed(seed);

    logEvents(logEvents: LogEvents, func: logDelegate) {
        this.logDelegates.push(func);
        if (this.logDelegate === 0) {
            this.logDelegate = this.im.addFunction((type: number, ptr: number) => this.onLog(type, ptr), 'vii');
            this.im._Magick_SetLogDelegate(this.logDelegate);

            const eventNames = this.getEventNames(logEvents);
            withString(this.im, eventNames, (events: number) => {
                this.im._Magick_SetLogEvents(events);
            });
        }
    }

    private onLog(type: number, ptr: number) {
        const message = this.im.UTF8ToString(ptr);
        this.logDelegates.forEach((delegate) => {
            delegate(type, message);
        });
    }

    private getEventNames(logEvents: LogEvents) {
        if (logEvents === LogEvents.All)
            return 'All,Trace'

        if (logEvents === LogEvents.Detailed)
            return 'All'

        let values = [];
        for (const value of Object.keys(LogEvents).map(item => Number(item)).filter(item => !isNaN(item) && item > 0))
        {
            if ((value & logEvents) === value)
                values.push(LogEvents[value]);
        }

        return values.join(',');
    }
}