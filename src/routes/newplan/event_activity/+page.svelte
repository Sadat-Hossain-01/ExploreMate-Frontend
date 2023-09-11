<script lang="ts">
  import ShowEvents from "./show_events.svelte";
  import ShowActivities from "./show_activities.svelte";
  import plan_store from "$lib/stores/planstore";
  import type { Event } from "$lib/interfaces/event";
  import type { Activity } from "$lib/interfaces/activity";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { loading_store } from "$lib/stores/serverstore";
  import server_store from "$lib/stores/serverstore";
  import { Stretch } from "svelte-loading-spinners";

  $plan_store.choice_progress = 4;
  let loading: boolean = true;
  let suggested_events: Array<Event> = [];
  let suggested_activities: Array<Activity> = [];
  let data_event: any;
  let data_activity: any;

  onMount(() => {
    async function fetchStuffs() {
      $loading_store = true;

      let selected_destinations: Array<string> = [];
      $plan_store.destinations.forEach((destination) => {
        selected_destinations.push(destination.name);
      });

      try {
        const response_event = await fetch(
          $server_store + "/destination/event",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ destinations: selected_destinations }),
          }
        );
        const response_activity = await fetch(
          $server_store + "/destination/activity",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ destinations: selected_destinations }),
          }
        );

        if (response_event.ok && response_activity.ok) {
          data_event = await response_event.json();
          data_activity = await response_activity.json();
        } else {
          console.log(
            "found error",
            response_event.status,
            response_activity.status
          );
        }
      } catch (err) {
        console.log("found error");
        throw err;
      }
      suggested_events = data_event;
      suggested_activities = data_activity;
      $loading_store = false;
      loading = false;
    }
    fetchStuffs();
  });

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

{#if loading}
  <div class="flex justify-center items-center h-screen flex-col my-auto">
    <Stretch size="3" color="#FF3E00" unit="cm" duration="1s" />
    <div class="ml-4 text-2xl font-bold tracking-wider pt-5">
      Retrieving Events & Activities...
    </div>
  </div>
{:else}
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
{/if}
