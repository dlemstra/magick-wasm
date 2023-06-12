// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { LogEventTypes } from '../../src/log-event-types';
import { Magick } from '../../src/magick';
import { TestImages } from '../test-images';

describe('Magick#onLog', () => {
    it('should raise log events from ImageMagick', () => {
        const eventTypeCounts: Record<number, number> = {};

        Magick.onLog = (event) => {
            if (eventTypeCounts[event.eventType] === undefined)
                eventTypeCounts[event.eventType] = 0;

            eventTypeCounts[event.eventType]++;
            expect(event.message.length).toBeGreaterThan(0);
        };

        Magick.setLogEvents(LogEventTypes.All);

        ImageMagick.read(TestImages.fujiFilmFinePixS1ProJpg.data, (image) => {
            expect(image.width).toBe(600);
        });

        Magick.setLogEvents(LogEventTypes.None);

        expect(eventTypeCounts[LogEventTypes.Cache]).toBeGreaterThanOrEqual(5);
        expect(eventTypeCounts[LogEventTypes.Coder]).toBeGreaterThanOrEqual(16);
        expect(eventTypeCounts[LogEventTypes.Pixel]).toBeGreaterThanOrEqual(5);
        expect(eventTypeCounts[LogEventTypes.Policy]).toBeGreaterThanOrEqual(1);
        expect(eventTypeCounts[LogEventTypes.Resource]).toBeGreaterThanOrEqual(1);
        expect(eventTypeCounts[LogEventTypes.Trace]).toBeGreaterThanOrEqual(675);
    });
});
