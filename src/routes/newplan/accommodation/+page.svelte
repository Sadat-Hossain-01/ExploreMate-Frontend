<script lang="ts">
  import type { Hotel } from "$lib/interfaces/hotel";
  import ShowHotels from "./show_hotels.svelte";
  import plan_store from "$lib/stores/planstore";

  $plan_store.choice_progress = 3;

  export let data: any;
  let suggested_hotels: Array<Hotel> = data.hotels;
</script>

<svelte:head>
  <title>Choose Hotels</title></svelte:head
>

<ShowHotels bind:suggested_hotels />
