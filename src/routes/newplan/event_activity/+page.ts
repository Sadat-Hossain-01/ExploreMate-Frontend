import plan_store from "$lib/stores/planstore";
import server_store from "$lib/stores/serverstore";
import { redirect } from "@sveltejs/kit";

let selected_destinations: string[] = ["Lalakhal", "Hason Raja Museum"];
let server_url: string = "";

plan_store.subscribe((plan) => {
    plan.destinations.forEach((destination: any) => {
        selected_destinations.push(destination.name);
    });
    if (plan.cities.length == 0)
        throw redirect(307, "/newplan");
    else if (plan.destinations.length < 3)
        throw redirect(307, "/newplan/destinations");
});

server_store.subscribe((url: string) => {
    server_url = url;
});

export async function load() {
    try {
        const response_event = await fetch(server_url + "/destination/event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ destinations: selected_destinations }),
        });
        const response_activity = await fetch(server_url + "/destination/activity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ destinations: selected_destinations }),
        });

        if (response_event.ok && response_activity.ok) {
            const data_event = await response_event.json();
            const data_activity = await response_activity.json();

            // console.log(data_event);
            // console.log(data_activity);
            return {
                events: data_event,
                activities: data_activity,
            };
        }
    } catch (err) {
        console.log("found error");
        throw err;
    }
}
