<script lang="ts">
  import type { Hotel } from "$lib/interfaces/hotel";
  import { Search } from "flowbite-svelte";
  import HotelCard from "./hotel_card.svelte";
  import plan_store from "$lib/stores/planstore";

  export let suggested_hotels: Array<Hotel>;

  let hotel_input: string = "";

  let hotel_suggestions: Array<Hotel> = suggested_hotels;
  let hotel_selections: Array<Hotel> = [];
  let filtered_hotel_suggestions: Array<Hotel> = []; // filtered based on input
  let filtered_hotel_selections: Array<Hotel> = []; // filtered based on input
  let showable_hotels: Array<Hotel> = [];
  let show_selected_hotels: boolean = false;

  $: {
    hotel_selections = hotel_suggestions.filter((hotel: any) => hotel.selected);
    filtered_hotel_suggestions = hotel_suggestions.filter((hotel: any) =>
      hotel.name.toLowerCase().includes(hotel_input.toLowerCase())
    );
    filtered_hotel_selections = hotel_selections.filter((hotel: any) =>
      hotel.name.toLowerCase().includes(hotel_input.toLowerCase())
    );
    if (show_selected_hotels && hotel_input.length > 0)
      showable_hotels = filtered_hotel_selections;
    else if (show_selected_hotels && hotel_input.length == 0)
      showable_hotels = hotel_selections;
    else if (!show_selected_hotels && hotel_input.length > 0)
      showable_hotels = filtered_hotel_suggestions;
    else showable_hotels = hotel_suggestions;
    $plan_store.hotels = hotel_selections;
  }
</script>

<div class="relative flex flex-col">
  <div class="px-3 mt-12 mb-8 md:px-12">
    <div class="flex flex-col justify-start gap-4">
      <h2 class="text-3xl font-bold md:text-4xl">
        Top Hotels for Accommodation
      </h2>
    </div>
    <p class="mt-4 text-base primary-text-ink md:text-lg">
      Select the hotels to dwell in if you have any preferences
    </p>
  </div>
  <div class="flex flex-grow px-3 pb-52 md:px-12">
    <div class="w-full">
      <div class="flex items-stretch gap-2 mb-8 md:gap-3">
        <div class="relative w-full basis-10/12">
          <Search bind:value={hotel_input} placeholder={"Search Hotels"} />
        </div>
        <div class="w-full basis-2/12">
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
</div>
