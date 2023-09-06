import type { Destination } from "./destination";
import type { Event } from "./event";
import type { Activity } from "./activity";
import type { Hotel } from "./hotel";
import type { Restaurant } from "./restaurant";

export interface Plan {
    start_date: string;
    duration: number;
    cities: string[];
    destinations: Destination[];
    events: Event[];
    activities: Activity[];
    hotels: Hotel[],
    all_hotels: Hotel[],
    restaurants: Restaurant[],
    all_restaurants: Restaurant[],
    food_budget: number; // 1 for low, 2 for medium, 3 for high
    room_budget: number; // 1 for budget, 2 for premium, 3 for deluxe
    star_choice: number; // like 5-star
    choice_progress: number; // 0 : city, 1 : destination, 2 : food, 3 : accomodation, 4 : events & activities
    buddy_count: number,
    destination_estimated_budget: number,
    hotel_estimated_budget: number,
    restaurant_estimated_budget: number,
    activity_estimated_budget: number,
    event_estimated_budget: number
}

export const hashmap: Record<number, [string, string]> = {
    0: ["City", "/newplan"],
    1: ["Destinations", "/newplan/destinations"],
    2: ["Food", "/newplan/food"],
    3: ["Accommodation", "/newplan/accommodation"],
    4: ["Events & Activities", "/newplan/event_activity"],
    5: ["Itinerary", "/newplan/plan"]
};
