<script lang="ts">
  import type { MapItem } from "$lib/interfaces/mapitem";
  import type { Destination } from "$lib/interfaces/destination";
  import ShowDestinations from "./show_destinations.svelte";
  import plan_store from "$lib/stores/planstore";
  import Map from "../map.svelte";
  export let data;

  $plan_store.choice_progress = 1;

  let destination_suggestions: Array<Destination> = data.destinations;
  let current_mapitems: Array<MapItem> = [];

  $: {
    current_mapitems = $plan_store.destinations.map((destination) => {
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
    <ShowDestinations bind:destination_suggestions />
  </section>
  <section
    class="fixed right-0 h-full w-full overflow-hidden border-l border-solid border-gray-200 transition-transform lg:w-[45%] translate-x-full md:block lg:translate-x-0"
  >
    <div id="map" class="relative flex flex-row-reverse w-full h-full">
      <Map bind:current_mapitems />
    </div>
  </section>
</div>
