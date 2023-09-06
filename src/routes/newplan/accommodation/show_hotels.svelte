<script lang="ts">
  import type { Hotel } from "$lib/interfaces/hotel";
  import { Label, Search, Range, Radio } from "flowbite-svelte";
  import HotelCard from "./hotel_card.svelte";
  import plan_store from "$lib/stores/planstore";
  import { goto } from "$app/navigation";

  export let suggested_hotels: Array<Hotel>;

  let hotel_input: string = "";
  let star_wanted: number = 3;
  let room_quality_choice: number = 2; // 1 = budget, 2 = premium, 3 = deluxe

  $plan_store.choice_level = 3;

  let hotel_suggestions: Array<Hotel> = suggested_hotels;
  let hotel_selections: Array<Hotel> = [];
  let filtered_hotel_suggestions: Array<Hotel> = []; // filtered based on input
  let filtered_hotel_selections: Array<Hotel> = []; // filtered based on input
  let showable_hotels: Array<Hotel> = [];
  let show_selected_hotels: boolean = false;

  $: {
    hotel_selections = hotel_suggestions.filter((hotel: any) => hotel.selected);
    filtered_hotel_suggestions = hotel_suggestions.filter(
      (hotel: any) =>
        hotel.name.toLowerCase().includes(hotel_input.toLowerCase()) &&
        hotel.star >= star_wanted
    );
    filtered_hotel_selections = hotel_selections.filter((hotel: any) =>
      hotel.name.toLowerCase().includes(hotel_input.toLowerCase())
    );

    if (show_selected_hotels) {
      if (hotel_input.length > 0) showable_hotels = filtered_hotel_selections;
      else showable_hotels = hotel_selections;
    } else if (!show_selected_hotels) {
      if (hotel_input.length > 0) showable_hotels = filtered_hotel_suggestions;
      else showable_hotels = hotel_suggestions;
    }

    showable_hotels.sort((a: any, b: any) => {
      if (a.star > b.star) return -1;
      else if (a.star < b.star) return 1;
      else return 0;
    });

    if (!show_selected_hotels) {
      showable_hotels = showable_hotels.filter(
        (hotel: any) => hotel.star >= star_wanted
      );
    }

    $plan_store.hotels = hotel_selections;

    $plan_store.hotel_budget = 0;

    let budget_avg: number = 0;
    let premium_avg: number = 0;
    let deluxe_avg: number = 0;

    $plan_store.hotels.forEach((hotel: any) => {
      if (hotel.low !== null) budget_avg += hotel.low;
      if (hotel.mid !== null) premium_avg += hotel.mid;
      if (hotel.high !== null) deluxe_avg += hotel.high;
    });

    if ($plan_store.hotels.length > 0) {
      budget_avg /= $plan_store.hotels.length;
      premium_avg /= $plan_store.hotels.length;
      deluxe_avg /= $plan_store.hotels.length;
    }

    let multiplier: number = 0;
    if (room_quality_choice === 1) multiplier = budget_avg;
    else if (room_quality_choice === 2) multiplier = premium_avg;
    else if (room_quality_choice === 3) multiplier = deluxe_avg;

    $plan_store.hotel_budget =
      multiplier * $plan_store.duration * (1 + $plan_store.traveler_count);
  }
</script>

<div class="relative flex flex-col">
  <div class="px-3 mt-12 mb-8 md:px-12">
    <div class="flex flex-col justify-start gap-4">
      <h2 class="text-3xl font-bold md:text-4xl">Accommodation Choices</h2>
    </div>
    <span>
      <Label class="text-2xl font-bold mt-5 mb-2" for="range-minmax"
        >Star Rating:</Label
      >
      <div>Depending on this, we will show you suggestions.</div>
      <div class="flex flex-col justify-start gap-4 w-1/2 mt-3">
        <Range id="range-minmax" min="1" max="5" bind:value={star_wanted} />
        <div class="flex justify-between">
          <span class="text-sm">1</span>
          <span class="text-sm">2</span>
          <span class="text-sm">3</span>
          <span class="text-sm">4</span>
          <span class="text-sm">5</span>
        </div>
      </div>
    </span>

    <Label class="text-2xl font-bold mt-5 mb-2" for="range-minmax"
      >Room Quality Preference:</Label
    >
    <div class="grid gap-6 w-full md:grid-cols-3">
      <Radio
        name="custom"
        custom
        on:click={() => {
          room_quality_choice = 1;
        }}
      >
        <div
          class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-600 peer-checked:text-primary-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 h-full"
        >
          <div>
            <div class="w-full text-lg font-semibold">Budget</div>
            <div class="w-full">
              Cozy and affordable rooms ideal for cost-conscious travelers
              looking for comfortable accommodation without breaking the bank.
            </div>
          </div>
        </div>
      </Radio>
      <Radio
        name="custom"
        custom
        on:click={() => {
          room_quality_choice = 2;
        }}
      >
        <div
          class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-600 peer-checked:text-primary-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 h-full"
        >
          <div class="block">
            <div class="w-full text-lg font-semibold">Premium</div>
            <div class="w-full">
              Spacious and well-appointed rooms designed to offer a balance of
              comfort and value, perfect for travelers seeking a comfortable and
              upgraded stay.
            </div>
          </div>
        </div>
      </Radio>
      <Radio
        name="custom"
        custom
        on:click={() => {
          room_quality_choice = 3;
        }}
      >
        <div
          class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-600 peer-checked:text-primary-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 h-full"
        >
          <div class="block">
            <div class="w-full text-lg font-semibold">Deluxe</div>
            <div class="w-full">
              Luxurious and elegantly furnished rooms offering a top-tier
              experience with premium amenities and exceptional service,
              catering to travelers seeking the utmost in comfort and
              indulgence.
            </div>
          </div>
        </div>
      </Radio>
    </div>

    <p class="mt-4 text-base primary-text-ink md:text-lg">
      Select the hotels you would like to stay at during your trip.
    </p>
  </div>
  <div class="flex flex-grow px-3 pb-10 md:px-12">
    <div class="w-full">
      <div class="flex items-stretch gap-2 mb-8 md:gap-3">
        <div class="relative w-full basis-4/12">
          <Search bind:value={hotel_input} placeholder={"Search Restaurants"} />
        </div>
        <div class="w-full basis-1/12">
          <button
            class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-accent-col text-primary-ink hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            on:click={() => {
              show_selected_hotels = !show_selected_hotels;
            }}
          >
            <span class="hidden h-full whitespace-nowrap md:block"
              >{show_selected_hotels
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
          {#each showable_hotels as hotel}
            <HotelCard bind:hotel />
          {/each}
        </div>
      </div>
    </div>
  </div>
  <button
    type="button"
    class="focus:outline-none text-primary-ink bg-accent-col hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg text-lg font-semibold px-5 py-2.5 mx-auto dark:focus:ring-yellow-900 mb-5"
    on:click|stopPropagation={() => {
      goto("/newplan/event_activity");
    }}>Proceed</button
  >
</div>
