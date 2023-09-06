import plan_store from "$lib/stores/planstore";
import server_store from "$lib/stores/serverstore";
import type { Plan } from "$lib/interfaces/plan";
import type { Day } from "$lib/interfaces/day";
import { routeAlgo } from "$lib/dynamic/routeAlgo";
import { redirect } from "@sveltejs/kit";

let plan: Plan;

plan_store.subscribe((current_plan) => {
    plan = current_plan;
    if (plan.cities.length == 0)
        throw redirect(307, "/newplan");
});

export async function load() {
    try {
        const data = await routeAlgo(plan);
        // console.log(data);
        return {
            plan: data,
        }
    } catch (err) {
        console.log("found error");
        throw err;
    }
}
