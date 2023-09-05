<script lang="ts">
  import type { Restaurant } from "$lib/interfaces/restaurant";
  import ShowRestaurants from "./show_restaurants.svelte";
  import plan_store from "$lib/stores/planstore";

  export let data: any;
  $plan_store.choice_level = 2;
  let suggested_restaurants: Array<Restaurant> = data.restaurants;
</script>

<svelte:head>
  <title>Choose Restaurants</title></svelte:head
>

<ShowRestaurants bind:suggested_restaurants />
