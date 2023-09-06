import type { Activity } from "$lib/interfaces/activity";
import type { Destination } from "$lib/interfaces/destination";

// activity list er moddhe jotogula activity ache, segula theke destination id er sathe match kore activity gula select kore return kore
export async function getActivity(destination : Destination, activities : Array<Activity>): Promise<Array<Activity>> {
    let selected = [];
    for(let i = 0; i < activities.length; i++) {
        if(activities[i].destination_id == destination.id) {
            selected.push(activities[i]);
        }
    }
    return selected;
}
