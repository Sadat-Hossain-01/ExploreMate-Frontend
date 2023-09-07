<script lang="ts">
  import EventCard from "./event_card.svelte";
  import type { Event } from "$lib/interfaces/event";
  import { Search } from "flowbite-svelte";
  import plan_store from "$lib/stores/planstore";

  let event_input: string = "";

  export let suggested_events: Array<Event>;

  console.log(suggested_events);
  let event_suggestions: Array<Event> = suggested_events;

  // check if the events are already over
  let today: Date = new Date($plan_store.start_date);
  let end_date: Date = new Date($plan_store.start_date);
  end_date.setDate(end_date.getDate()+$plan_store.duration);
  console.log(today, end_date);
  event_suggestions = event_suggestions.filter(
    (event: any) =>{
      console.log(event.startTime,event.endTime);
      console.log(today, end_date,new Date(event.startTime),new Date(event.endTime));
      console.log(new Date(event.startTime) <= end_date);
      console.log( new Date(event.endTime) >= today);
      return (new Date(event.startTime) <= end_date && new Date(event.endTime) >= today);
    }
  );

  let event_selections: Array<Event> = [];
  let filtered_event_suggestions: Array<Event> = []; // filtered based on input
  let filtered_event_selections: Array<Event> = []; // filtered based on input
  let showable_events: Array<Event> = [];
  let show_selected_events: boolean = false;

  $: {
    event_selections = event_suggestions.filter((event: any) => event.selected);
    filtered_event_suggestions = event_suggestions.filter((event: any) =>
      event.name.toLowerCase().includes(event_input.toLowerCase())
    );
    filtered_event_selections = event_selections.filter((event: any) =>
      event.name.toLowerCase().includes(event_input.toLowerCase())
    );

    if (show_selected_events) {
      if (event_input.length > 0) showable_events = filtered_event_selections;
      else showable_events = event_selections;
    } else if (!show_selected_events) {
      if (event_input.length > 0) showable_events = filtered_event_suggestions;
      else showable_events = event_suggestions;
    }

    $plan_store.events = event_selections;
  }
</script>

<div class="relative flex flex-col">
  <div class="px-3 mt-12 mb-8 md:px-12">
    <div class="flex flex-col justify-start gap-4">
      <h2 class="text-3xl font-bold md:text-4xl">Top Events to Attend</h2>
    </div>
    <p class="mt-4 text-base primary-text-ink md:text-lg">
      Select the events you would like to explore for your visit
    </p>
  </div>
  <div class="flex flex-grow px-3 pb-10 md:px-12">
    <div class="w-full">
      <div class="flex items-stretch gap-2 mb-8 md:gap-3">
        <div class="relative w-full basis-10/12">
          <Search bind:value={event_input} placeholder={"Search Events"} />
        </div>
        <div class="w-full basis-2/12">
          <button
            class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-accent-col text-primary-ink hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            on:click={() => {
              show_selected_events = !show_selected_events;
            }}
          >
            <span class="hidden h-full whitespace-nowrap md:block"
              >{show_selected_events
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
          {#each showable_events as event}
            <EventCard bind:event />
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
