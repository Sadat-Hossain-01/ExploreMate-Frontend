import plan_store from "$lib/stores/planstore";
import server_store from "$lib/stores/serverstore";
import { redirect } from "@sveltejs/kit";

let current_city: string = "";
let server_url: string = "";

plan_store.subscribe((plan) => {
  current_city = plan.city;
  // uncomment the following line to redirect to newplan if no city is selected
  // if (current_city.length == 0) {
  //   throw redirect(307, "/newplan");
  // }
});

server_store.subscribe((url: string) => {
  server_url = url;
});

export async function load() {
  try {
    const response = await fetch(server_url + "/city", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: current_city }),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        destinations: data,
      };
    } else {
      return {
        status: response.status,
        error: new Error("HTTP Error"),
      };
    }
  } catch (err) {
    console.log("found error");
    throw err;
  }
}
