import server_store from "$lib/stores/serverstore";

let server_url: string = "";

server_store.subscribe((url: string) => {
  server_url = url;
});

export async function load() {
  try {
    const response = await fetch(server_url + "/recom", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return {
        cities: data,
      };
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
