import type { Event } from "$lib/interfaces/event";
import type { Destination } from "$lib/interfaces/destination";

export async function getEvent(destination: Destination, events: Array<Event>): Promise<Array<Event>> {
    let selected = [];
    for(let i = 0; i < events.length; i++) {
        if(events[i].destination_id === destination.id) {
            selected.push(events[i]);
        }
    }
    return selected;
}

export async function mustEvent(events: Array<Event>, present: Date): Promise<Array<Event>> {
    let selected = [];
    for(let i = 0; i < events.length; i++) {
        let start : Date = new Date(events[i].start_time);
        let end : Date = new Date(events[i].end_time);
        let day : number = (end.getTime() - present.getTime())/(1000*60*60*24);
        if(start <= present && day <= 1 && day >= 0) {
            selected.push(events[i]);
        }
    }
    return selected;
}

export async function isEligible(events: Array<Event>, destination: Destination, present: Date){
    let selected = await getEvent(destination, events);
    let able = [];
    let unable = [];
    for(let i = 0; i < selected.length; i++) {
        if(selected[i].destination_id !== destination.id) {
            continue;
        }
        let start : Date = new Date(selected[i].start_time);
        if(start <= present) {
            able.push(selected[i]);
        }
        else {
            unable.push(selected[i]);
        }
    }
    return {able, unable};
}
