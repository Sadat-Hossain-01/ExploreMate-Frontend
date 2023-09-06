import plan_store from "$lib/stores/planstore";
import server_store from "$lib/stores/serverstore";
import { redirect } from "@sveltejs/kit";

let selected_destinations: string[] = [];
let server_url: string = "";

plan_store.subscribe((plan) => {
    plan.destinations.forEach((destination: any) => {
        selected_destinations.push(destination.name);
    });
    // console.log("Plan Cities before Accommodation: ", plan.cities);
    // if (plan.cities.length == 0) {

    //     throw redirect(307, "/newplan");
    // }
    // else if (plan.destinations.length < 1)
    //     throw redirect(307, "/newplan/destinations");
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
        if (response_hotel.ok) {
            const data_hotel = await response_hotel.json();
            console.log(data_hotel);
            return {
                hotels: data_hotel,
            };
        }
    } catch (err) {
        console.log("found error");
        throw err;
    }
}
