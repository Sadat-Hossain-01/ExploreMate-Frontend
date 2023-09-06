import type { Hotel } from "$lib/interfaces/hotel";
import server_store from "$lib/stores/serverstore";

let server_url: string = "";

server_store.subscribe((url: string) => {
  server_url = url;
});

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

export async function hotelCity(cityId: number, star: number) {
  try {
    const response = await fetch(server_url + "/cityhotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city_id: cityId, star: star }),
    });

    if (response.ok) {
        const data = await response.json();
        let hotel : Hotel = data[0];
        return hotel;
    } else {
      return {
        status: response.status,
        error: new Error("HTTP Error"),
      };
    }
  } catch (err) {
    throw err;
  }

}
