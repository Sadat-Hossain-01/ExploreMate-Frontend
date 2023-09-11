import plan_store from "$lib/stores/planstore";
import type { Plan } from "$lib/interfaces/plan";
import { routeAlgo } from "$lib/dynamic/routeAlgo";

let plan: Plan;

plan_store.subscribe((current_plan) => {
  plan = current_plan;
});

export async function generate_plan() {
  try {
    const data = await routeAlgo(plan);
    return {
      plan: data,
    };
  } catch (err) {
    console.log("found error");
    throw err;
  }
}
