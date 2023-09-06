import { distanceClac } from "./distanceCalc";
import { getActivity } from "./getActivity";
import { getRestaurant ,getCityRestaurants, getPreferedRest} from "./getRestaurant";
import { getEvent, mustEvent, isEligible } from "./getEvent";
import { getDestination } from "./getDestination";
import { hotelInit, hotelCity, destinationCity } from "./hotelInit";
import type { Activity } from "../interfaces/activity";
import type { Event } from "../interfaces/event";
import type { Restaurant } from "../interfaces/restaurant";
import type { Destination } from "../interfaces/destination";
import type { Hotel } from "$lib/interfaces/hotel";
import type { Day } from "$lib/interfaces/day";
import type { DayItem } from "$lib/interfaces/dayitem";
import type { Plan } from "$lib/interfaces/plan";

const transportCost: number = 0.1;
// write a function to convert string to real number
function convertTimeToNumber(time: string): number {
  let hour: number = parseInt(time.split(":")[0]);
  let minute: number = parseInt(time.split(":")[1]);
  return hour + minute / 60;
}

// write a function to convert real number to string time in hh:mm format
function convertNumberToTime(time: number): string {
  let hour: number = Math.floor(time);
  let minute: number = Math.round((time - hour) * 60);
  if (minute == 60) {
    hour++;
    minute = 0;
  }
  let hourString: string = hour.toString();
  let minuteString: string = minute.toString();
  if (hour < 10) {
    hourString = "0" + hourString;
  }
  if (minute < 10) {
    minuteString = "0" + minuteString;
  }
  return hourString + ":" + minuteString;
}

async function getDayitemFromDest(
  dest: Destination,
  oldlat: number,
  oldlng: number,
  plan: Plan,
  time: number
) {
  let { distance, duration } = await distanceClac(
    oldlat,
    oldlng,
    dest.lat,
    dest.lng
  );
  time += duration / 3600;
  let eligibleActivities: Array<Activity> = await getActivity(
    dest,
    plan.activities
  );
  let timeNeeded: number = 0;
  let cost: number = 0;
  let description: string = "Enjoy your time at " + dest.name;
  if (eligibleActivities.length > 0) description += " and complete ";
  for (let i: number = 0; i < eligibleActivities.length; i++) {
    timeNeeded += eligibleActivities[i].time;
    cost += plan.buddy_count*(eligibleActivities[i].minCost+eligibleActivities[i].maxCost)/2;
    description += eligibleActivities[i].name;
    if (i < eligibleActivities.length - 1) {
      description += ", ";
    }
  }
  let eligibleEvents: Array<Event> = await getEvent(dest, plan.events);
  if (eligibleEvents.length > 0) description += " and attend ";
  for (let i: number = 0; i < eligibleEvents.length; i++) {
    timeNeeded += eligibleEvents[i].estimated_time;
    cost+=plan.buddy_count*(eligibleEvents[i].minCost+eligibleEvents[i].maxCost)/2;
    description += eligibleEvents[i].name;
    if (i < eligibleEvents.length - 1) {
      description += ", ";
    }
    // delete the event from plan.events
    plan.events = plan.events.filter((event) => {
      return event.id !== eligibleEvents[i].id;
    });
  }
  let dayitem: DayItem = {
    name: dest.name,
    start_time: convertNumberToTime(time),
    end_time: convertNumberToTime(time + dest.estimated_time + timeNeeded),
    lat: dest.lat,
    lng: dest.lng,
    description: description + ". Travel time: " + duration/60 + " minutes",
    estimated_cost: dest.estimated_cost+cost+distance*transportCost/1000,
  };
  return dayitem;
}

async function getNextRestaurant(
  lat: number,
  lng: number,
  pref: Array<Restaurant>,
  all: Array<Restaurant>,
  city_id: number
) {
  if (pref.length > 0) {  
    let rest = await getPreferedRest(pref, lat, lng, city_id);
    console.log("pref: ", rest);
    if (rest != null) {
      let id = rest.id;
      // delete the restaurant from pref
      console.log("pref_id: ", id);
      return rest;
    }
  }
  console.log("no pref");
  let rest = await getRestaurant(all, lat, lng);
  return rest;
}


async function getNextHotel(
  lat: number,
  lng: number,
  plan: Plan,
  current: Date
) {
  let mevent = await mustEvent(plan.events, current);
  let dest = await getDestination(plan.destinations, lat, lng);
  if (mevent.length > 0) {
    let event = mevent[0];
    for (let i = 0; i < plan.destinations.length; i++) {
      if (plan.destinations[i].id === event.destination_id) {
        dest = plan.destinations[i];
      }
    }
  }
  let hotels: Array<Hotel> = await hotelCity(dest.city_id, plan.star_choice);
  let temp = plan.star_choice;
  while (hotels.length == 0) {
    temp = ((temp + 1) % 5) + 1;
    hotels = await hotelCity(dest.city_id, temp);
  }

  // traverse through the firstHotelList check whether hotels array have that hotel or not, if has, then firstHotel = that hotel
  let flag: boolean = false;
  for (let i = 0; i < hotels.length; i++) {
    for (let j = 0; j < plan.hotels.length; j++) {
      if (hotels[i].hotel_id === plan.hotels[j].hotel_id) {
        flag = true;
        break;
      }
    }
    if (flag) {
      return hotels[i];
    }
  }
  return hotels[0];
}

export async function routeAlgo(plan: Plan) {
  console.log(plan);
  let days: Array<Day> = [];
  let current: Date = new Date(plan.start_date);
  let dayCount: number = 1;
  let hotels: Array<Hotel> = [];
  let allRestaurants: Array<Restaurant> = [];
  let prefRestaurants: Array<Restaurant> = [];
  console.log("Plan: ", plan.destinations);

  if (plan.hotels.length == 0) {
    hotels = plan.all_hotels;
  } else {
    hotels = plan.hotels;
  }

  prefRestaurants = plan.restaurants;
  allRestaurants = plan.all_restaurants;

  let firstHotel: Hotel = hotels[0];

  let mustEvents = await mustEvent(plan.events, current);
  if (mustEvents.length > 0) {
    // get the destination of the first mustEvent and get the hotel of that city
    let lat, lng: number;
    let cityID: number = 1;

    hotels = hotels.filter((hotel) => {
      hotel.star >= plan.star_choice;
    });
    plan.destinations.forEach((destination) => {
      if (destination.id === mustEvents[0].destination_id) {
        lat = destination.lat;
        lng = destination.lng;
        cityID = destination.city_id;
      }
    });
    // firstHotel = await hotelCity(cityID, plan.star_choice);
    let firstHotelList: Array<Hotel> = [];
    firstHotelList = await hotelCity(cityID, plan.star_choice);
    // firstHotel = firstHotelList[0];
    // traverse through the firstHotelList check whether hotels array have that hotel or not, if has, then firstHotel = that hotel
    for (let i = 0; i < firstHotelList.length; i++) {
      let flag: boolean = false;
      for (let j = 0; j < hotels.length; j++) {
        if (firstHotelList[i].hotel_id === hotels[j].hotel_id) {
          flag = true;
          break;
        }
      }
      if (flag) {
        firstHotel = firstHotelList[i];
        break;
      } else {
        firstHotel = firstHotelList[0];
      }
    }
  } else {
    firstHotel = await hotelInit(hotels);
  }

  //add the hotel as  a day item
  let city_destinations: Array<Destination> = await destinationCity(
    firstHotel,
    plan.destinations
  );
  let city_restaurants: Array<Restaurant> = await getCityRestaurants(
    allRestaurants,
    firstHotel.city_id
  );
  //pop all city_destinations from plan.destinations
  plan.destinations = plan.destinations.filter((destination) => {
    return destination.city_id !== firstHotel.city_id;
  });

  while (dayCount <= plan.duration) {
    let flag: boolean = false;
    let day: Day = {
      date:
        current.getDate() +
        "-" +
        current.getMonth() +
        "-" +
        current.getFullYear(),
      items: [],
    };
    let hotelCost: number = 0;
    if(plan.room_budget == 1) {
      hotelCost = firstHotel.low;
    }
    else if(plan.room_budget == 2) {
      hotelCost = firstHotel.mid;
    }
    else {
      hotelCost = firstHotel.high;
    }
    let time: number = 8;
    let dayitem: DayItem = {
      name: firstHotel.name,
      start_time: "8:00",
      end_time: "8:00",
      lat: firstHotel.lat,
      lng: firstHotel.lng,
      description: "Leave hotel for breakfast",
      estimated_cost: hotelCost*plan.buddy_count,
    };
    let dest = city_destinations[0];
    let lastPosLat: number = firstHotel.lat;
    let lastPosLng: number = firstHotel.lng;
    if (firstHotel.comp_breakfast) {
      dayitem = {
        name: firstHotel.name,
        start_time: "8:00",
        end_time: "8:30",
        lat: firstHotel.lat,
        lng: firstHotel.lng,
        description: "Take complimentary breakfast in the hotel",
        estimated_cost: hotelCost*plan.buddy_count,
      };
      time = 8.5;
      day.items.push(dayitem);
      dest = await getDestination(
        city_destinations,
        firstHotel.lat,
        firstHotel.lng
      );
    } else {
      let restaurant: Restaurant = await getNextRestaurant(
        firstHotel.lat,
        firstHotel.lng,
        prefRestaurants,
        city_restaurants,
        firstHotel.city_id
      );

      prefRestaurants = prefRestaurants.filter((prefRestaurant) => {
        return prefRestaurant.id !== restaurant.id;
      });
      let { distance, duration } = await distanceClac(
        firstHotel.lat,
        firstHotel.lng,
        restaurant.lat,
        restaurant.lng
      );
      day.items.push(dayitem);
      dayitem = {
        name: restaurant.name,
        start_time: convertNumberToTime(time + duration / 3600),
        end_time: convertNumberToTime(time + duration / 3600 + 0.5),
        lat: restaurant.lat,
        lng: restaurant.lng,
        description: "Take breakfast in " + restaurant.name + ". Travel time: " + duration/60 + " minutes",
        estimated_cost: restaurant.breakfast*plan.buddy_count+distance*transportCost/1000,
      };
      time = time + duration / 3600 + 0.5;
      dest = await getDestination(
        city_destinations,
        restaurant.lat,
        restaurant.lng
      );
      lastPosLat = restaurant.lat;
      lastPosLng = restaurant.lng;
      day.items.push(dayitem);
    }

    console.log("city_dest: ", city_destinations);
    //pop the dest from city_destinations
    city_destinations = city_destinations.filter((destination) => {
      return destination.id !== dest.id;
    });

    //add the dest as a day item
    dayitem = await getDayitemFromDest(
      dest,
      lastPosLat,
      lastPosLng,
      plan,
      time
    );
    time = convertTimeToNumber(dayitem.end_time);
    day.items.push(dayitem);
    lastPosLat = dest.lat;
    lastPosLng = dest.lng;
    console.log("dayitem: ", dayitem);
    while (true) {
      if (city_destinations.length == 0) {
        flag = true;
        break;
      }
      dest = await getDestination(city_destinations, lastPosLat, lastPosLng);
      let newdayitem = await getDayitemFromDest(
        dest,
        lastPosLat,
        lastPosLng,
        plan,
        time
      );
      let rest = await getNextRestaurant(
        dest.lat, 
        dest.lng,
        prefRestaurants,
        city_restaurants,
        dest.city_id
      );
      let { distance, duration } = await distanceClac(
        dest.lat,
        dest.lng,
        rest.lat,
        rest.lng
      );
      if (convertTimeToNumber(newdayitem.end_time) + duration / 3600 > 14.5) {
        break;
      } else {
        day.items.push(newdayitem);
        lastPosLat = dest.lat;
        lastPosLng = dest.lng;
        console.log("city_dest: ", city_destinations);
        console.log("newdayitem: ", newdayitem);
        city_destinations = city_destinations.filter((destination) => {
          return destination.id !== dest.id;
        });
        time = convertTimeToNumber(newdayitem.end_time);
      }
    }
    if (flag) {
      if (plan.destinations.length == 0) {
        days.push(day);
        break;
      }
      let temp: Date = new Date(current.getTime());
      temp.setDate(temp.getDate() + 1);
      firstHotel = await getNextHotel(lastPosLat, lastPosLng, plan, temp);
      city_destinations = await destinationCity(firstHotel, plan.destinations);
      city_restaurants = await getCityRestaurants(
        allRestaurants,
        firstHotel.city_id
      );
      plan.destinations = plan.destinations.filter((destination) => {
        return destination.city_id !== firstHotel.city_id;
      });
      let clac = await distanceClac(
        lastPosLat,
        lastPosLng,
        firstHotel.lat,
        firstHotel.lng
      );
      dayitem = {
        name: firstHotel.name,
        start_time: convertNumberToTime(time),
        end_time: convertNumberToTime(time + clac.duration / 3600),
        lat: firstHotel.lat,
        lng: firstHotel.lng,
        description:"Finish touring the city and check in to " + firstHotel.name + ". Travel time: " + clac.duration/60 + " minutes",
        estimated_cost: clac.distance*transportCost/1000,
      };
      time = time + clac.duration / 3600;
      day.items.push(dayitem);
      lastPosLat = firstHotel.lat;
      lastPosLng = firstHotel.lng;
      flag = false;
    }
    let restaurant: Restaurant = await getNextRestaurant(
      lastPosLat, 
      lastPosLng,
      prefRestaurants,
      city_restaurants,
      firstHotel.city_id
    );

    prefRestaurants = prefRestaurants.filter((prefRestaurant) => {
      return prefRestaurant.id !== restaurant.id;
    });
    let { distance, duration } = await distanceClac(
      lastPosLat,
      lastPosLng,
      restaurant.lat,
      restaurant.lng
    );
    dayitem = {
      name: restaurant.name,
      start_time: convertNumberToTime(time + duration / 3600),
      end_time: convertNumberToTime(time + duration / 3600 + 1),
      lat: restaurant.lat,
      lng: restaurant.lng,
      description: "Take lunch in " + restaurant.name + ". Travel time: " + duration/60 + " minutes",
      estimated_cost: restaurant.lunch*plan.buddy_count+distance*transportCost/1000,
    };
    time = time + duration / 3600 + 1;
    day.items.push(dayitem);
    lastPosLat = restaurant.lat;
    lastPosLng = restaurant.lng;
    while (true) {
      if (city_destinations.length == 0) {
        flag = true;
        break;
      }
      dest = await getDestination(city_destinations, lastPosLat, lastPosLng);
      let newdayitem = await getDayitemFromDest(
        dest,
        lastPosLat,
        lastPosLng,
        plan,
        time
      );
      let { distance, duration } = await distanceClac(
        dest.lat,
        dest.lng,
        firstHotel.lat,
        firstHotel.lng
      );
      if (convertTimeToNumber(newdayitem.end_time) + duration / 3600 > 19.5) {
        break;
      } else {
        day.items.push(newdayitem);
        lastPosLat = dest.lat;
        lastPosLng = dest.lng;
        console.log("city_dest: ", city_destinations);
        console.log("newdayitem: ", newdayitem);
        city_destinations = city_destinations.filter((destination) => {
          return destination.id !== dest.id;
        });

        time = convertTimeToNumber(newdayitem.end_time);
      }
    }
    if (flag) {
      if (plan.destinations.length == 0) {
        days.push(day);
        break;
      }
      let temp: Date = new Date(current.getTime());
      temp.setDate(temp.getDate() + 1);
      firstHotel = await getNextHotel(lastPosLat, lastPosLng, plan, temp);
      city_destinations = await destinationCity(firstHotel, plan.destinations);
      city_restaurants = await getCityRestaurants(
        allRestaurants,
        firstHotel.city_id
      );
      plan.destinations = plan.destinations.filter((destination) => {
        return destination.city_id !== firstHotel.city_id;
      });
      let clac = await distanceClac(
        lastPosLat,
        lastPosLng,
        firstHotel.lat,
        firstHotel.lng
      );
      dayitem = {
        name: firstHotel.name,
        start_time: convertNumberToTime(time),
        end_time: convertNumberToTime(time + clac.duration / 3600),
        lat: firstHotel.lat,
        lng: firstHotel.lng,
        description:
          "Finish touring the city and check in to " + firstHotel.name + ". Travel time: " + clac.duration/60 + " minutes",
        estimated_cost: clac.distance*transportCost/1000,
      };
      time = time + clac.duration / 3600;
      day.items.push(dayitem);
      lastPosLat = firstHotel.lat;
      lastPosLng = firstHotel.lng;
      flag = false;
    }
    restaurant = await getNextRestaurant(
      lastPosLat, 
      lastPosLng,
      prefRestaurants,
      city_restaurants,
      firstHotel.city_id
    );

    prefRestaurants = prefRestaurants.filter((prefRestaurant) => {
      return prefRestaurant.id !== restaurant.id;
    });
    ({ distance, duration } = await distanceClac(
      lastPosLat,
      lastPosLng,
      restaurant.lat,
      restaurant.lng
    ));
    dayitem = {
      name: restaurant.name,
      start_time: convertNumberToTime(time + duration / 3600),
      end_time: convertNumberToTime(time + duration / 3600 + 1),
      lat: restaurant.lat,
      lng: restaurant.lng,
      description: "Take dinner in " + restaurant.name + ". Travel time: " + duration/60 + " minutes",
      estimated_cost: restaurant.dinner*plan.buddy_count+distance*transportCost/1000,
    };
    time = time + duration / 3600 + 1;
    day.items.push(dayitem);
    lastPosLat = restaurant.lat;
    lastPosLng = restaurant.lng;
    dayitem = {
      name: firstHotel.name,
      start_time: convertNumberToTime(time),
      end_time: convertNumberToTime(time + duration / 3600),
      lat: firstHotel.lat,
      lng: firstHotel.lng,
      description: "Return to " + firstHotel.name + " and take rest. Travel time: " + duration/60 + " minutes",
      estimated_cost: distance*transportCost/1000,
    };
    current.setDate(current.getDate() + 1);
    day.items.push(dayitem);
    days.push(day);
    dayCount++;
  }
  console.log("Returning ", days);
  return days;
}
