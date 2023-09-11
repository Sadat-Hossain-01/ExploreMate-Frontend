<script lang="ts">
  import type { Hotel } from "$lib/interfaces/hotel";
  import ShowHotels from "./show_hotels.svelte";
  import plan_store from "$lib/stores/planstore";
  import { loading_store } from "$lib/stores/serverstore";
  import server_store from "$lib/stores/serverstore";
  import { onMount } from "svelte";
  import { RingLoader } from "svelte-loading-spinners";

  let data: any;
  let suggested_hotels: Array<Hotel> = [];
  let loading: boolean = true;
  $plan_store.choice_progress = 3;

  onMount(() => {
    async function fetch_hotels() {
      $loading_store = true;

      let selected_destinations: Array<string> = [];
      $plan_store.destinations.forEach((destination) => {
        selected_destinations.push(destination.name);
      });

      try {
        const response_hotel = await fetch(
          $server_store + "/destination/hotel",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ destinations: selected_destinations }),
          }
        );
        if (response_hotel.ok) {
          data = await response_hotel.json();
          // console.log(data);
        } else {
          console.log("found error", response_hotel.status);
        }
      } catch (err) {
        console.log("found error");
        throw err;
      }
      suggested_hotels = data;
      $loading_store = false;
      loading = false;
    }

    fetch_hotels();
  });
</script>

<svelte:head>
  <title>Choose Hotels</title></svelte:head
>

{#if loading}
  <div class="flex justify-center items-center h-screen flex-col my-auto">
    <RingLoader size="3" color="#FF3E00" unit="cm" duration="1s" />
    <div class="ml-4 text-2xl font-bold tracking-wider pt-5">
      Retrieving Hotels...
    </div>
  </div>
{:else}
  <ShowHotels bind:suggested_hotels />
{/if}
