import { writable } from "svelte/store";

const PlanStore = writable(
    {
        City: "",
        Name: "",
    });

export default PlanStore;