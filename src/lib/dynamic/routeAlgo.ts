import { distanceClac } from "./distanceCalc";
import { getActivity } from "./getActivity";
import { getRestaurant } from "./getRestaurant";
import { getEvent, mustEvent, isEligible } from "./getEvent";
import { getDestination } from "./getDestination";
import type { Activity } from "../interfaces/activity";
import type { Event } from "../interfaces/event";
import type { Restaurant } from "../interfaces/restaurant";
import type { Destination } from "../interfaces/destination";
import type { Hotel } from "$lib/interfaces/hotel";
import type { Day } from "$lib/interfaces/day";
import type { DayItem } from "$lib/interfaces/dayitem";
import type { Plan } from "$lib/interfaces/plan";

export async function routeAlgo(plan: Plan) {
    
}
