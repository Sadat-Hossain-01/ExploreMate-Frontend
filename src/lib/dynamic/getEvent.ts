import type { Event } from "$lib/interfaces/event";
import type { Destination } from "$lib/interfaces/destination";

// event list er moddhe jotogula event ache, segula theke destination id er sathe match kore event gula select kore return kore
export async function getEvent(destination: Destination, events: Array<Event>): Promise<Array<Event>> {
    let selected = [];
    for (let i = 0; i < events.length; i++) {
        if (events[i].destination_id === destination.id) {
            selected.push(events[i]);
        }
    }
    return selected;
}

// ajkei event ase kina check
export async function mustEvent(events: Array<Event>, present: Date): Promise<Array<Event>> {
    let selected = [];
    for (let i = 0; i < events.length; i++) {
        let start: Date = new Date(events[i].startTime);
        let end: Date = new Date(events[i].endTime);
        let day: number = (end.getTime() - present.getTime()) / (1000 * 60 * 60 * 24);
        if (start <= present && day <= 1 && day >= 0) {
            selected.push(events[i]);
        }
    }
    return selected;
}

// in future event ase kina check
export async function isEligible(events: Array<Event>, destination: Destination, present: Date) {
    let selected = await getEvent(destination, events);
    let able = [];
    let unable = [];
    for (let i = 0; i < selected.length; i++) {
        let start: Date = new Date(selected[i].startTime);
        if (start <= present) {
            continue
        }
        else {
            return false;
        }
    }
    return true;
}
