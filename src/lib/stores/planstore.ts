import { writable } from "svelte/store";
import type { Plan } from "../interfaces/plan";


const plan_store = writable<Plan>({
    city: "",
    destinations: [],
    events: [],
});

export default plan_store;