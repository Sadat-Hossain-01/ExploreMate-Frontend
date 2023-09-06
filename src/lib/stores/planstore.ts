import { writable } from "svelte/store";
import type { Plan } from "../interfaces/plan";


const plan_store = writable<Plan>({
    start_date: "",
    duration: 3,
    cities: [],
    destinations: [],
    events: [],
    activities: [],
    hotels: [],
    restaurants: [],
    food_choice: 0,
    choice_level: 0,
    traveler_count: 0,
    destination_budget: 0,
    hotel_budget: 0,
    restaurant_budget: 0,
    activity_budget: 0,
    event_budget: 0,
});

export default plan_store;