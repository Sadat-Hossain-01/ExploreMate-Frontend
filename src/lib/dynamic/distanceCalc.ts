let api_url: string =
  "https://api.mapbox.com/directions-matrix/v1/mapbox/driving/";
let api_key: string =
  "access_token=pk.eyJ1Ijoic2hhdHRpayIsImEiOiJjbG02cW44bzkwbHVvM3FtbTVtM3F2anowIn0.HkzawX0-3a3geKX7LqooyA";
let api_ano: string = "annotations=distance,duration";

// using map api, gets the distance between two points
export async function distanceClac(
  slat: number,
  slng: number,
  dlat: number,
  dlng: number
) {
  // try {
  //   const response = await fetch(
  //     api_url +
  //       slng +
  //       "," +
  //       slat +
  //       ";" +
  //       dlng +
  //       "," +
  //       dlat +
  //       "?" +
  //       api_ano +
  //       "&" +
  //       api_key,
  //     {
  //       method: "GET",
  //     }
  //   );

  //   const data = await response.json();
    return {
      distance: 2500,//data["distances"][0][1],
      duration: 3600//data["durations"][0][1],
    };
  // } catch (err) {
  //   throw err;
  // }
}
