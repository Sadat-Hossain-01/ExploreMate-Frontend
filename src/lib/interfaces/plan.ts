import type { Destination } from './destination';

export interface Plan {
    city: string;
    destinations: Destination[];
}
