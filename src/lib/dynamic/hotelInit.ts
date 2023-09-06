import type { Destination } from "$lib/interfaces/destination";
import type { Hotel } from "$lib/interfaces/hotel";
import server_store from "$lib/stores/serverstore";

let server_url: string = "";

server_store.subscribe((url: string) => {
  server_url = url;
});

// gets the northest-eastest hotel
export async function hotelInit(hotels: Array<Hotel>) {
  let idx: number = -1;
  for (let i = 0; i < hotels.length; i++) {
    if (
      idx < 0 ||
      (hotels[i].lat > hotels[idx].lat && hotels[i].lng > hotels[idx].lng)
    ) {
      idx = i;
    }
  }
  return hotels[idx];
}

// gets a hotel in the city for a given star
export async function hotelCity(cityId: number, star: number) {
  try {
    const response = await fetch(server_url + "/cityhotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city_id: cityId, star: star }),
    });

    const data = await response.json();
    return data;
    // let hotel: Hotel = data;
    // return hotel;
  } catch (err) {
    throw err;
  }
}

// get destinations in the city of the hotel
export async function destinationCity(
  hotel: Hotel,
  destinations: Array<Destination>
) {
  let city_id = hotel.city_id;
  let city_destinations: Array<Destination> = [];
  for (let i = 0; i < destinations.length; i++) {
    if (destinations[i].city_id == city_id) {
      city_destinations.push(destinations[i]);
    }
  }
  return city_destinations;
}
