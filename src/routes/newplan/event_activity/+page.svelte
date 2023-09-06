<script lang="ts">
  import ShowEvents from "./show_events.svelte";
  import ShowActivities from "./show_activities.svelte";
  import plan_store from "$lib/stores/planstore";
  import type { Event } from "$lib/interfaces/event";
  import type { Activity } from "$lib/interfaces/activity";
  import { goto } from "$app/navigation";

  export let data: any;

  $plan_store.choice_progress = 4;

  let suggested_events: Array<Event> = data.events;
  let suggested_activities: Array<Activity> = data.activities;

  $: {
    $plan_store.event_estimated_budget = 0;
    $plan_store.events.forEach((event: any) => {
      $plan_store.event_estimated_budget +=
        (event.minCost + event.maxCost) / 2.0;
    });
  }

  $: {
    $plan_store.activity_estimated_budget = 0;
    $plan_store.activities.forEach((activity: any) => {
      $plan_store.activity_estimated_budget +=
        (activity.minCost + activity.maxCost) / 2.0;
    });
  }
</script>

<svelte:head>
  <title>Choose Events & Activities</title></svelte:head
>

<div class="z-50 flex flex-col-reverse lg:flex-row">
  <section class="w-full lg:w-[50%]">
    <ShowEvents bind:suggested_events />
  </section>
  <section class="w-full lg:w-[50%]">
    <ShowActivities bind:suggested_activities />
    <button
      type="button"
      class="focus:outline-none text-primary-ink bg-accent-col hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg text-lg font-semibold px-5 py-2.5 mx-auto dark:focus:ring-yellow-900 mb-5"
      on:click|stopPropagation={() => {
        goto("/newplan/plan");
      }}>Finalize</button
    >
  </section>
</div>
