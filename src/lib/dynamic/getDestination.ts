import type { Destination } from "$lib/interfaces/destination";
import { distanceClac } from "./distanceCalc";

export async function getDestination(destinations : Array<Destination>, lat : number, lng : number): Promise<Destination> {
    let minDur : number = -1;
    let minDis : number = -1;
    let minIdx : number = -1;
    for(let i = 0; i < destinations.length; i++) {
        let data = await distanceClac(lat, lng, destinations[i].lat, destinations[i].lng);
        if(minDur == -1 || minDur > data.duration) {
            minDur = data.duration;
            minDis = data.distance;
            minIdx = i;
        }
    }
    return destinations[minIdx];
}
