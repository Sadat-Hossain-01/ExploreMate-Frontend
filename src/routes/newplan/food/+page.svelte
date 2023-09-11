<script lang="ts">
  import type { Restaurant } from "$lib/interfaces/restaurant";
  import ShowRestaurants from "./show_restaurants.svelte";
  import plan_store from "$lib/stores/planstore";
  import { loading_store } from "$lib/stores/serverstore";
  import server_store from "$lib/stores/serverstore";
  import { onMount } from "svelte";
  import { Plane } from "svelte-loading-spinners";

  let data: any;
  let suggested_restaurants: Array<Restaurant> = [];
  let loading: boolean = true;
  $plan_store.choice_progress = 2;

  onMount(() => {
    async function fetch_restaurants() {
      $loading_store = true;

      let selected_destinations: Array<string> = [];
      $plan_store.destinations.forEach((destination) => {
        selected_destinations.push(destination.name);
      });

      try {
        const response_restaurant = await fetch(
          $server_store + "/destination/restaurant",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ destinations: selected_destinations }),
          }
        );
        if (response_restaurant.ok) {
          data = await response_restaurant.json();
          // console.log(data);
        } else {
          console.log("found error", response_restaurant.status);
        }
      } catch (err) {
        console.log("found error");
        throw err;
      }
      suggested_restaurants = data;
      $loading_store = false;
      loading = false;
    }

    fetch_restaurants();
  });
</script>

<svelte:head>
  <title>Choose Restaurants</title></svelte:head
>

{#if loading}
  <div class="flex justify-center items-center h-screen flex-col my-auto">
    <Plane size="3" color="#FF3E00" unit="cm" duration="1s" />
    <div class="ml-4 text-2xl font-bold tracking-wider pt-5">
      Retrieving Restaurants...
    </div>
  </div>
{:else}
  <ShowRestaurants bind:suggested_restaurants />
{/if}
