<script lang="ts">
  import type { Restaurant } from "$lib/interfaces/restaurant";
  import { Search } from "flowbite-svelte";
  import { Range, Label } from "flowbite-svelte";

  import RestaurantCard from "./restaurant_card.svelte";
  import plan_store from "$lib/stores/planstore";
  import { goto } from "$app/navigation";

  export let suggested_restaurants: Array<Restaurant>;

  $plan_store.choice_level = 2;

  let restaurant_input: string = "";
  let value: number = 2;
  $: $plan_store.food_choice = value;

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

    showable_restaurants.sort((a: any, b: any) => {
      if (a.rating > b.rating) return -1;
      else if (a.rating < b.rating) return 1;
      else return 0;
    });

    $plan_store.restaurants = restaurant_selections;

    console.log($plan_store.restaurants);

    $plan_store.restaurant_budget = 0;

    let breakfast_avg: number = 0;
    let lunch_avg: number = 0;
    let dinner_avg: number = 0;
    $plan_store.restaurants.forEach((restaurant: any) => {
      console.log(restaurant);
      if (restaurant.breakfast != null) breakfast_avg += restaurant.breakfast;
      if (restaurant.lunch != null) lunch_avg += restaurant.lunch;
      if (restaurant.dinner != null) dinner_avg += restaurant.dinner;
    });
    if ($plan_store.restaurants.length !== 0) {
      breakfast_avg /= $plan_store.restaurants.length;
      lunch_avg /= $plan_store.restaurants.length;
      dinner_avg /= $plan_store.restaurants.length;
      console.log(
        breakfast_avg,
        lunch_avg,
        dinner_avg,
        $plan_store.duration,
        $plan_store.traveler_count
      );
      $plan_store.restaurant_budget =
        (breakfast_avg + lunch_avg + dinner_avg) *
        $plan_store.duration *
        ($plan_store.traveler_count + 1);
    }
  }
</script>

<div class="relative flex flex-col">
  <div class="px-3 mt-12 mb-8 md:px-12">
    <div class="flex flex-col justify-start gap-4">
      <h2 class="text-3xl font-bold md:text-4xl">Meal Preferences</h2>
    </div>
    <span>
      <Label class="text-2xl font-bold mt-5 mb-2" for="range-minmax"
        >Price Range:</Label
      >
      <div>
        Depending on budget level, we will calculate the estimated cost.
      </div>
      <div class="flex flex-col justify-start gap-4 w-1/2 mt-3">
        <Range id="range-minmax" min="1" max="3" bind:value />
        <div class="flex justify-between">
          <span class="text-sm">Low</span>
          <span class="text-sm">Mid</span>
          <span class="text-sm">High</span>
        </div>
      </div>
    </span>
    <p class="mt-4 text-base primary-text-ink md:text-lg">
      Select the restaurants you would like to include in your trip.
    </p>
  </div>
  <div class="flex flex-grow px-3 pb-10 md:px-12">
    <div class="w-full">
      <div class="flex items-stretch gap-2 mb-8 md:gap-3">
        <div class="relative w-full basis-4/12">
          <Search
            bind:value={restaurant_input}
            placeholder={"Search Restaurants"}
          />
        </div>
        <div class="w-full basis-1/12">
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
          class="grid grid-flow-row-dense grid-cols-2 gap-4 pb-6 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4"
        >
          {#each showable_restaurants as restaurant}
            <RestaurantCard bind:restaurant />
          {/each}
        </div>
      </div>
    </div>
  </div>
  <button
    type="button"
    class="focus:outline-none text-primary-ink bg-accent-col hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg text-lg font-semibold px-5 py-2.5 mx-auto dark:focus:ring-yellow-900 mb-5"
    on:click|stopPropagation={() => {
      goto("/newplan/accommodation");
    }}>Proceed</button
  >
</div>
