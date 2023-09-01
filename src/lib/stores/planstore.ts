import { writable } from "svelte/store";

const PlanStore = writable(
    {
        City: "Sylhet",
    });

export default PlanStore;