<script lang="ts">
  import type { Activity } from "$lib/interfaces/activity";
  import { Search } from "flowbite-svelte";
  import Activitycard from "./activity_card.svelte";
  import plan_store from "$lib/stores/planstore";

  let activity_input: string = "";

  export let suggested_activities: Array<Activity>;

  let activity_suggestions: Array<Activity> = suggested_activities;
  let activity_selections: Array<Activity> = [];
  let filtered_activity_suggestions: Array<Activity> = []; // filtered based on input
  let filtered_activity_selections: Array<Activity> = []; // filtered based on input
  let showable_activities: Array<Activity> = [];
  let show_selected_activities: boolean = false;

  $: {
    activity_selections = activity_suggestions.filter(
      (activity: any) => activity.selected
    );
    filtered_activity_suggestions = activity_suggestions.filter(
      (activity: any) =>
        activity.name.toLowerCase().includes(activity_input.toLowerCase())
    );
    filtered_activity_selections = activity_selections.filter((activity: any) =>
      activity.name.toLowerCase().includes(activity_input.toLowerCase())
    );

    if (show_selected_activities) {
      if (activity_input.length > 0)
        showable_activities = filtered_activity_selections;
      else showable_activities = activity_selections;
    } else if (!show_selected_activities) {
      if (activity_input.length > 0)
        showable_activities = filtered_activity_suggestions;
      else showable_activities = activity_suggestions;
    }

    $plan_store.activities = activity_selections;
  }
</script>

<div class="relative flex flex-col">
  <div class="px-3 mt-12 mb-8 md:px-12">
    <div class="flex flex-col justify-start gap-4">
      <h2 class="text-3xl font-bold md:text-4xl">Top Activities to Explore</h2>
    </div>
    <p class="mt-4 text-base primary-text-ink md:text-lg">
      Select the activities you would like to explore for your visit
    </p>
  </div>
  <div class="flex flex-grow px-3 pb-10 md:px-12">
    <div class="w-full">
      <div class="flex items-stretch gap-2 mb-8 md:gap-3">
        <div class="relative w-full basis-10/12">
          <Search
            bind:value={activity_input}
            placeholder={"Search Activities"}
          />
        </div>
        <div class="w-full basis-2/12">
          <button
            class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-accent-col text-primary-ink hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            on:click={() => {
              show_selected_activities = !show_selected_activities;
            }}
          >
            <span class="hidden h-full whitespace-nowrap md:block"
              >{show_selected_activities
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
          {#each showable_activities as activity}
            <Activitycard bind:activity />
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
