import plan_store from "$lib/stores/planstore";
import server_store from "$lib/stores/serverstore";
import { redirect } from "@sveltejs/kit";

let selected_destinations: string[] = ["Lalakhal"];
let server_url: string = "";

plan_store.subscribe((plan) => {
    plan.destinations.forEach((destination: any) => {
        selected_destinations.push(destination.name);
    });
    // if (desired_cities.length == 0) {
    //     throw redirect(307, "/newplan");
    // }
});

server_store.subscribe((url: string) => {
    server_url = url;
});

export async function load() {
    try {
        const response_hotel = await fetch(server_url + "/destination/hotel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ destinations: selected_destinations }),
        });

        const response_restaurant = await fetch(server_url + "/destination/restaurant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ destinations: selected_destinations }),
        });

        if (response_hotel.ok && response_restaurant.ok) {
            const data_hotel = await response_hotel.json();
            const data_restaurant = await response_restaurant.json();

            // console.log(data_hotel);
            // console.log(data_restaurant);
            return {
                hotels: data_hotel,
                restaurants: data_restaurant,
            };
        }
    } catch (err) {
        console.log("found error");
        throw err;
    }
}
