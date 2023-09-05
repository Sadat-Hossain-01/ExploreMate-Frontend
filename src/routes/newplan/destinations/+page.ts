import plan_store from "$lib/stores/planstore";
import server_store from "$lib/stores/serverstore";
import { redirect } from "@sveltejs/kit";

let desired_cities: string[] = [];
let server_url: string = "";

plan_store.subscribe((plan) => {
  desired_cities = plan.cities;
  if (desired_cities.length == 0) {
    desired_cities = ["Sylhet"];
    // throw redirect(307, "/newplan");
  }
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
      body: JSON.stringify({ cities: desired_cities }),
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
