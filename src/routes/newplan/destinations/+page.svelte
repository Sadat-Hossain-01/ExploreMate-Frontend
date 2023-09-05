<script lang="ts">
  import type { Destination } from "$lib/interfaces/destination";
  import type { MapItem } from "$lib/interfaces/mapitem";
  import plan_store from "$lib/stores/planstore";
  import { goto } from "$app/navigation";
  import Destinationcard from "./destination_card.svelte";
  import { Search } from "flowbite-svelte";
  import Map from "../map.svelte";
  export let data;

  let search_input: string = "";

  $plan_store.choice_level = 1;

  let destination_suggestions: Array<Destination> = data.destinations;
  let destination_selections: Array<Destination> = [];
  let filtered_suggestions: Array<Destination> = []; // filtered based on input
  let filtered_selections: Array<Destination> = []; // filtered based on input
  let showable_destinations: Array<Destination> = [];
  let current_mapitems: MapItem[] = [];
  let show_selected_ones: boolean = false;

  $: {
    destination_selections = destination_suggestions.filter(
      (destination: any) => destination.selected
    );
    filtered_suggestions = destination_suggestions.filter((destination: any) =>
      destination.name.toLowerCase().includes(search_input.toLowerCase())
    );
    filtered_selections = destination_selections.filter((destination: any) =>
      destination.name.toLowerCase().includes(search_input.toLowerCase())
    );
    if (show_selected_ones && search_input.length > 0)
      showable_destinations = filtered_selections;
    else if (show_selected_ones && search_input.length == 0)
      showable_destinations = destination_selections;
    else if (!show_selected_ones && search_input.length > 0)
      showable_destinations = filtered_suggestions;
    else showable_destinations = destination_suggestions;

    $plan_store.destinations = destination_selections;

    current_mapitems = destination_selections.map((destination) => {
      return {
        name: destination.name,
        lat: destination.lat,
        lng: destination.lng,
      };
    });
  }
</script>

<svelte:head>
  <title>Choose Destinations</title></svelte:head
>

<div class="z-50 flex flex-col-reverse lg:flex-row">
  <section class="w-full lg:w-[55%]">
    <div class="relative flex flex-col">
      <div class="px-3 mt-12 mb-8 md:px-12">
        <div class="flex flex-col justify-start gap-4">
          <h2 class="text-3xl font-bold md:text-4xl">Top Destinations</h2>
        </div>
        <p class="mt-4 text-base primary-text-ink md:text-lg">
          Select the destinations you would like to include for your visit
        </p>
      </div>
      <div class="flex flex-grow px-3 pb-10 md:px-12">
        <div class="w-full">
          <div class="flex items-stretch gap-2 mb-8 md:gap-3">
            <div class="relative w-full basis-10/12">
              <Search
                bind:value={search_input}
                placeholder={"Search Destinations"}
              />
            </div>
            <div class="w-full basis-2/12">
              <button
                class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-accent-col text-primary-ink hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                on:click={() => {
                  show_selected_ones = !show_selected_ones;
                }}
              >
                <span class="hidden h-full whitespace-nowrap md:block"
                  >{show_selected_ones
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
              {#each showable_destinations as destination}
                <Destinationcard bind:destination />
              {/each}
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="focus:outline-none text-primary-ink bg-accent-col hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg text-lg font-semibold px-5 py-2.5 mx-auto dark:focus:ring-yellow-900 mb-5"
        on:click|stopPropagation={() => {
          goto("/newplan/food");
        }}>Proceed</button
      >
    </div>
  </section>
  <section
    class="fixed right-0 h-full w-full overflow-hidden border-l border-solid border-gray-200 transition-transform lg:w-[45%] translate-x-full md:block lg:translate-x-0"
  >
    <div id="map" class="relative flex flex-row-reverse w-full h-full">
      <Map bind:current_mapitems />
    </div>
  </section>
</div>
