<script lang="ts">
  import ShowHotels from "./show_hotels.svelte";
  import ShowRestaurants from "./show_restaurants.svelte";
  import type { Hotel } from "$lib/interfaces/hotel";
  import type { Restaurant } from "$lib/interfaces/restaurant";

  export let data: any;

  // console.log(data.hotels);
  // console.log(data.restaurants);

  let suggested_hotels: Array<Hotel> = data.hotels;
  let suggested_restaurants: Array<Restaurant> = data.restaurants;

  // console.log(suggested_hotels);
  // console.log(suggested_restaurants);
</script>

<svelte:head>
  <title>Choose Hotels & Restaurants</title></svelte:head
>

<div class="z-50 flex flex-col-reverse lg:flex-row">
  <section class="w-full lg:w-[50%]">
    <ShowHotels bind:suggested_hotels />
  </section>
  <section class="w-full lg:w-[50%]">
    <ShowRestaurants bind:suggested_restaurants />
  </section>
</div>
