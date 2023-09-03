import type { Destination } from './destination';
import type { Event } from './event';

export interface Plan {
    city: string;
    start_date: string;
    duration: number;
    destinations: Destination[];
    events: Event[];
}
