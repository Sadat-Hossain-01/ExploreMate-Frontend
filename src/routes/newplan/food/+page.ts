import plan_store from "$lib/stores/planstore";
import server_store from "$lib/stores/serverstore";
import { redirect } from "@sveltejs/kit";

let selected_destinations: string[] = [];
let server_url: string = "";

plan_store.subscribe((plan) => {
    plan.destinations.forEach((destination: any) => {
        selected_destinations.push(destination.name);
    });
    if (plan.cities.length == 0)
        throw redirect(307, "/newplan");
    // else if (plan.destinations.length < 1)
    //     throw redirect(307, "/newplan/destinations");
});

server_store.subscribe((url: string) => {
    server_url = url;
});

export async function load() {
    try {
        const response_restaurant = await fetch(server_url + "/destination/restaurant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ destinations: selected_destinations }),
        });
        if (response_restaurant.ok) {
            const data_restaurant = await response_restaurant.json();
            // console.log(data_restaurant);
            return {
                restaurants: data_restaurant,
            };
        }
    } catch (err) {
        console.log("found error");
        throw err;
    }
}
