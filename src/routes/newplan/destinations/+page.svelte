<script lang="ts">
  import type { MapItem } from "$lib/interfaces/mapitem";
  import type { Destination } from "$lib/interfaces/destination";
  import ShowDestinations from "./show_destinations.svelte";
  import plan_store from "$lib/stores/planstore";
  import Map from "../map.svelte";
  import { onMount } from "svelte";
  import { loading_store } from "$lib/stores/serverstore";
  import server_store from "$lib/stores/serverstore";
  import { Rainbow } from "svelte-loading-spinners";

  $plan_store.choice_progress = 1;
  let data: any;
  let destination_suggestions: Array<Destination> = [];
  let current_mapitems: Array<MapItem> = [];
  let loading: boolean = true;

  onMount(() => {
    async function fetch_destinations() {
      $loading_store = true;
      try {
        const response = await fetch($server_store + "/city", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cities: $plan_store.cities }),
        });

        if (response.ok) {
          data = await response.json();
        } else {
          console.log("found error", response.status);
        }
      } catch (err) {
        console.log("found error");
        throw err;
      }

      destination_suggestions = data;

      $loading_store = false;
      loading = false;
    }
    fetch_destinations();
  });

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
{#if loading}
  <div class="flex justify-center items-center h-screen flex-col my-auto">
    <Rainbow size="3" color="#FF3E00" unit="cm" duration="1s" />
    <div class="ml-4 text-2xl font-bold tracking-wider pt-5">
      Retrieving Destinations...
    </div>
  </div>
{:else}
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
{/if}
