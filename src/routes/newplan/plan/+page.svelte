<script lang="ts">
  import { Accordion, Span } from "flowbite-svelte";
  import type { Day } from "$lib/interfaces/day";
  import type { MapItem } from "$lib/interfaces/mapitem";
  import DayAccordion from "./day.svelte";
  import Map from "../map.svelte";
  import plan_store from "$lib/stores/planstore";
  import type { DayItem } from "$lib/interfaces/dayitem";
  import { onMount } from "svelte";
  import { Wave } from "svelte-loading-spinners";
  import { loading_store } from "$lib/stores/serverstore";
  import { routeAlgo } from "$lib/dynamic/routeAlgo";

  $plan_store.choice_progress = 5;
  let data: any;
  let current_mapitems: MapItem[] = [];
  let total_cost: number = 0;
  let loading: boolean = true;
  let all_days: Array<Day> = [];
  let error: boolean = false;

  onMount(() => {
    async function generate_plan() {
      $loading_store = true;
      try {
        data = await routeAlgo($plan_store);
      } catch (err) {
        error = true;
        console.log("found error", err);
        throw err;
      }

      // construct array of days from above data
      for (let i = 0; i < data.length; i++) {
        let current_day: Day = data[i];
        all_days.push(current_day);
        current_day.items.forEach((item: DayItem) => {
          total_cost += item.estimated_cost;
        });

        $plan_store.plan_created = true;
        $plan_store.plan_final_cost = total_cost;
        $loading_store = false;
        loading = false;
      }
    }
    generate_plan();
  });

  let open_status = Array(all_days.length).fill(false);
  const open_all = () => open_status.forEach((_, i) => (open_status[i] = true));
  const close_all = () =>
    open_status.forEach((_, i) => (open_status[i] = false));

  $: {
    current_mapitems = [];
    all_days.forEach((day, i) => {
      if (open_status[i]) {
        day.items.forEach((item) => {
          current_mapitems.push({
            name: item.name,
            lat: item.lat,
            lng: item.lng,
          });
        });
      }
    });
  }
</script>

<svelte:head>
  <title>Final Tour Plan</title>
</svelte:head>

{#if !error}
  {#if loading}
    <div class="flex justify-center items-center h-screen flex-col my-auto">
      <Wave size="3" color="#FF3E00" unit="cm" duration="1s" />
      <!-- write generating plan in a newline -->
      <div class="ml-4 text-2xl font-bold tracking-wider pt-5">
        Generating Plan...
      </div>
    </div>
  {:else}
    <div class="flex">
      <div class="flex-col w-[55%] space-y-8 px-12">
        <div class="mt-8 text-4xl font-bold tracking-wider">
          <Span gradient>Tour Plan</Span>
        </div>
        <div class="flex space-x-4">
          <button
            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-semibold text-primary-ink rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            on:click={open_all}
          >
            <span
              class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
            >
              Open All
            </span>
          </button>
          <button
            class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-semibold text-primary-ink rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            on:click={close_all}
          >
            <span
              class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
            >
              Close All
            </span>
          </button>
        </div>
        <Accordion multiple>
          {#each all_days as day, i}
            <DayAccordion {day} bind:is_open={open_status[i]} day_number={i} />
          {/each}
        </Accordion>
      </div>
      <div
        class="fixed right-0 h-full w-full overflow-hidden border-l border-solid border-gray-200 transition-transform lg:w-[45%] translate-x-full md:block lg:translate-x-0"
      >
        <div id="map" class="relative flex flex-row-reverse w-full h-full">
          <Map bind:current_mapitems />
        </div>
      </div>
    </div>
  {/if}
{:else}
  <div class="flex justify-center items-center h-screen flex-col my-auto">
    <div class="ml-4 text-2xl font-bold tracking-wider pt-5">
      <img
        src="https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
        class="object-contain w-96 h-auto"
        alt="404"
      />
      <div class="text-4xl font-bold tracking-wider pt-5 mx-auto">
        Error Generating Plan...
      </div>
    </div>
  </div>
{/if}
