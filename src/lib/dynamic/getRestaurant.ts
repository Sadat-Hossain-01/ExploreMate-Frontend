import type { Restaurant } from "$lib/interfaces/restaurant";
import { distanceClac } from "./distanceCalc";

// return the nearest restaurant from the lat,long
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

export async function getPreferedRest(pref: Array<Restaurant>, lat: number, lng: number, city_id: number) {
    let prefCity: Array<Restaurant> = [];
    for(let i = 0; i < pref.length; i++) {
        if(pref[i].city_id == city_id) {
            prefCity.push(pref[i]);
        }
    }
    let rest: Restaurant;
    if(prefCity.length != 0) {
        rest = await getRestaurant(prefCity, lat, lng);
        return rest;
    }
    else {
        return null as unknown as Restaurant;
    }
}

export async function getCityRestaurants(restaurants: Array<Restaurant>, city_id: number) {
    let cityRest: Array<Restaurant> = [];
    for(let i = 0; i < restaurants.length; i++) {
        if(restaurants[i].city_id == city_id) {
            cityRest.push(restaurants[i]);
        }
    }
    return cityRest;
}