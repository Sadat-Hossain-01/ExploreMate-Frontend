<script lang="ts">
  import ShowEvents from "./show_events.svelte";
  import ShowActivities from "./show_activities.svelte";
  import type { Event } from "$lib/interfaces/event";
  import type { Activity } from "$lib/interfaces/activity";

  export let data: any;

  // console.log(data);
  let suggested_events: Array<Event> = data.events;
  let suggested_activities: Array<Activity> = data.activities;
  // console.log(suggested_activities, suggested_activities);
  // let d: Date = new Date(data.events[0].startTime);
  // console.log(d);
  // suggested_events = suggested_events.filter((event) => event !== null && event.start);
</script>

<svelte:head>
  <title>Choose Events & Activities</title></svelte:head
>

<div class="z-50 flex flex-col-reverse lg:flex-row">
  <section class="w-full lg:w-[50%]">
    <!-- <ShowEvents bind:suggested_events /> -->
  </section>
  <section class="w-full lg:w-[50%]">
    <ShowActivities bind:suggested_activities />
  </section>
</div>
