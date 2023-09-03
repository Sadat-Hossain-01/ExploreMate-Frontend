import type { Destination } from './destination';
import type { Event } from './event';

export interface Plan {
    city: string;
    destinations: Destination[];
    events: Event[];
}
