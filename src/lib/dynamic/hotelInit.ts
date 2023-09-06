import type { Hotel } from "$lib/interfaces/hotel";

export async function hotelInit(hotels: Array<Hotel>) {
    let idx : number = -1;
    for(let i = 0; i < hotels.length; i++) {
        if(idx < 0 || (hotels[i].lat > hotels[idx].lat && hotels[i].lng > hotels[idx].lng)) {
            idx = i;
        }
    }
    return hotels[idx];
}