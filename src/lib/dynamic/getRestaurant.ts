import type { Restaurant } from "$lib/interfaces/restaurant";
import { distanceClac } from "./distanceCalc";

export async function getRestaurant(restaurants : Array<Restaurant>, lat : number, lng : number): Promise<Restaurant> {
    let minDur : number = -1;
    let minDis : number = -1;
    let minIdx : number = -1;
    for(let i = 0; i < restaurants.length; i++) {
        let data = await distanceClac(lat, lng, restaurants[i].lat, restaurants[i].lng);
        if(minDur == -1 || minDur > data.duration) {
            minDur = data.duration;
            minDis = data.distance;
            minIdx = i;
        }
    }
    return restaurants[minIdx];
}
