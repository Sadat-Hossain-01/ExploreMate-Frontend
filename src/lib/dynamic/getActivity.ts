import type { Activity } from "$lib/interfaces/activity";
import type { Destination } from "$lib/interfaces/destination";

export async function getActivity(destination : Destination, activities : Array<Activity>): Promise<Array<Activity>> {
    let selected = [];
    for(let i = 0; i < activities.length; i++) {
        if(activities[i].destination_id == destination.id) {
            selected.push(activities[i]);
        }
    }
    return selected;
}
