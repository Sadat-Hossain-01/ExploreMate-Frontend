<script lang="ts">
  import { Accordion, Span } from "flowbite-svelte";
  import type { Day } from "$lib/interfaces/day";
  import type { MapItem } from "$lib/interfaces/mapitem";
  import DayAccordion from "./day.svelte";
  import Map from "../map.svelte";
  import plan_store from "$lib/stores/planstore";
  import type { DayItem } from "$lib/interfaces/dayitem";

  export let data: any;

  let current_mapitems: MapItem[] = [];
  $plan_store.choice_progress = 5;

  // console.log(data);
  // console.log(data.plan.length);
  // console.log(data.plan);
  // console.log(data.plan[0]);
  // let dd: DayItem = data.plan[0].items[0];
  // console.log(dd);

  // construct array of days from above data
  let all_days: Array<Day> = [];
  for (let i = 0; i < data.plan.length; i++) {
    let current_day: Day = data.plan[i];
    all_days.push(current_day);
  }

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
