<script lang="ts">
  import type { Restaurant } from "$lib/interfaces/restaurant";
  import { Search } from "flowbite-svelte";
  import RestaurantCard from "./restaurant_card.svelte";
  import plan_store from "$lib/stores/planstore";

  export let suggested_restaurants: Array<Restaurant>;

  let restaurant_input: string = "";

  let restaurant_suggestions: Array<Restaurant> = suggested_restaurants;
  let restaurant_selections: Array<Restaurant> = [];
  let filtered_restaurant_suggestions: Array<Restaurant> = []; // filtered based on input
  let filtered_restaurant_selections: Array<Restaurant> = []; // filtered based on input
  let showable_restaurants: Array<Restaurant> = [];
  let show_selected_restaurants: boolean = false;
  $: {
    restaurant_selections = restaurant_suggestions.filter(
      (restaurant: any) => restaurant.selected
    );
    filtered_restaurant_suggestions = restaurant_suggestions.filter(
      (restaurant: any) =>
        restaurant.name.toLowerCase().includes(restaurant_input.toLowerCase())
    );
    filtered_restaurant_selections = restaurant_selections.filter(
      (restaurant: any) =>
        restaurant.name.toLowerCase().includes(restaurant_input.toLowerCase())
    );
    if (show_selected_restaurants && restaurant_input.length > 0)
      showable_restaurants = filtered_restaurant_selections;
    else if (show_selected_restaurants && restaurant_input.length == 0)
      showable_restaurants = restaurant_selections;
    else if (!show_selected_restaurants && restaurant_input.length > 0)
      showable_restaurants = filtered_restaurant_suggestions;
    else showable_restaurants = restaurant_suggestions;
    $plan_store.restaurants = restaurant_selections;
  }
</script>

<div class="relative flex flex-col">
  <div class="px-3 mt-12 mb-8 md:px-12">
    <div class="flex flex-col justify-start gap-4">
      <h2 class="text-3xl font-bold md:text-4xl">Top Restaurants to Eat</h2>
    </div>
    <p class="mt-4 text-base primary-text-ink md:text-lg">
      Select the restaurants you would like to have a taste of
    </p>
  </div>
  <div class="flex flex-grow px-3 pb-52 md:px-12">
    <div class="w-full">
      <div class="flex items-stretch gap-2 mb-8 md:gap-3">
        <div class="relative w-full basis-10/12">
          <Search
            bind:value={restaurant_input}
            placeholder={"Search Restaurants"}
          />
        </div>
        <div class="w-full basis-2/12">
          <button
            class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-accent-col text-primary-ink hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            on:click={() => {
              show_selected_restaurants = !show_selected_restaurants;
            }}
          >
            <span class="hidden h-full whitespace-nowrap md:block"
              >{show_selected_restaurants
                ? "Show Suggestions"
                : "Show Selections"}</span
            >
          </button>
        </div>
      </div>
      <div>
        <div
          class="grid grid-flow-row-dense grid-cols-1 gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
        >
          {#each showable_restaurants as restaurant}
            <RestaurantCard bind:restaurant />
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
