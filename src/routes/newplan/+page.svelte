<script lang="ts">
  import {
    Input,
    Label,
    Search,
    Heading,
    Span,
    Alert,
    Badge,
  } from "flowbite-svelte";
  import plan_store from "$lib/stores/planstore";
  import { goto } from "$app/navigation";
  import { Icon } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import server_store from "$lib/stores/serverstore";
  import { loading_store } from "$lib/stores/serverstore";
  import { Pulse } from "svelte-loading-spinners";

  let unique: any = {};
  let city_input: string = "";
  let filtered_suggestions: string[] = [];
  let city_suggestions: string[] = [];
  let city_suggestion_open: boolean = false;
  let data: any;
  let traveler_count: number = 2;
  let day_count: number = 3;
  let show_error: boolean = false;
  let start_date: string = "";
  let date_error_message: string = "";
  let loading: boolean = true;

  $plan_store.choice_progress = 0;

  onMount(() => {
    async function fetch_cities() {
      $loading_store = true;
      try {
        const response = await fetch($server_store + "/recom", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          data = await response.json();
        } else {
          console.log("HTTP Error: " + response.status);
        }
      } catch (err) {
        throw err;
      }

      data.forEach((city: any) => {
        city_suggestions.push(
          city.name + ", " + city.state + ", " + city.country
        );
      });
      loading = false;
      $loading_store = false;
    }
    fetch_cities();
  });

  $: {
    filtered_suggestions = city_suggestions.filter(
      (city) =>
        city.toLowerCase().includes(city_input.toLowerCase()) &&
        !$plan_store.cities.includes(city.split(",")[0].trim())
    );
    filtered_suggestions = filtered_suggestions.slice(0, 5);
    if (city_input.length > 0) city_suggestion_open = true;
    else city_suggestion_open = false;
  }

  $: {
    if (start_date.length == 0)
      date_error_message = "Please select a start date.";
    else if (!checkDateValidity(start_date))
      date_error_message = "Please select a valid start date in future.";
    else {
      date_error_message = "";
      if ($plan_store.cities.length > 0) {
        unique = {};
        show_error = false;
      }
    }
  }

  const checkDateValidity = (date: string) => {
    let today = new Date();
    let input_date = new Date(date);
    return input_date >= today;
  };

  const makeMatchBold = (str: string) => {
    let match = city_input.toLowerCase();
    let matchIndex = str.toLowerCase().indexOf(match);
    if (matchIndex === -1) return str;
    const ret: string =
      str.substring(0, matchIndex) +
      "<b>" +
      str.substring(matchIndex, matchIndex + match.length) +
      "</b>" +
      str.substring(matchIndex + match.length);
    return ret;
  };
</script>

<svelte:head>
  <title>Plan Your Trip</title>
</svelte:head>
<svelte:window
  on:click|stopPropagation={() => (city_suggestion_open = false)}
/>

{#if loading}
  <div class="flex justify-center items-center h-screen flex-col my-auto">
    <Pulse size="3" color="#FF3E00" unit="cm" duration="1s" />
    <div class="ml-4 text-2xl font-bold tracking-wider pt-5">
      Getting Things Started...
    </div>
  </div>
{:else}
  <div
    class="flex flex-col w-1/3 h-screen pt-10 mx-auto my-5 space-y-3 relative"
  >
    <Heading
      tag="h1"
      class="mb-4"
      customSize="text-3xl font-extrabold  md:text-5xl lg:text-6xl mx-auto"
    >
      <div class="mx-auto text-center">
        <Span gradient>Plan Your Trip</Span>
      </div>
    </Heading>

    <Label class="mb-2 space-y-2 text-base font-semibold text-primary-ink">
      <span>Where do you want to go to?</span><br />
      <div class="flex flex-row flex-wrap space-x-1">
        {#each $plan_store.cities as selected_city}
          <Badge dismissable large color="green"
            >{selected_city}
            <button
              slot="close-button"
              type="button"
              class="inline-flex items-center p-1 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
              data-dismiss-target="#badge-dismiss-default"
              aria-label="Remove"
              on:click={() => {
                $plan_store.cities = $plan_store.cities.filter(
                  (city) => city != selected_city
                );
                $plan_store.cities = $plan_store.cities;
              }}
            >
              <svg
                class="w-2 h-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Remove badge</span>
            </button>
          </Badge>
        {/each}
      </div>
      <Search bind:value={city_input} placeholder={"Search Cities"} />
    </Label>
    <div>
      {#if city_suggestion_open && city_input.length > 0 && filtered_suggestions.length > 0}
        <div
          id="dropdown"
          class="absolute z-20 w-full bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700"
        >
          <ul
            class="w-full py-1 text-base text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            {#each filtered_suggestions as city}
              <li>
                <button
                  class="block w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  on:click|stopPropagation={() => {
                    $plan_store.cities.push(city.split(",")[0].trim());
                    city_input = "";
                    $plan_store.cities = $plan_store.cities;
                    filtered_suggestions = [];
                  }}
                >
                  {@html makeMatchBold(city)}
                </button>
              </li>
            {/each}
          </ul>
        </div>
      {/if}

      <Label class="mb-2 space-y-2 text-base font-semibold text-primary-ink">
        <span>When does your tour start?</span>
        <Input
          type="date"
          placeholder="Start Date"
          size="md"
          bind:value={start_date}
        />
      </Label>
    </div>
    <Label for="partners" class="mb-2 text-base font-semibold text-primary-ink"
      >How many people will possibly go with you?</Label
    >
    <div class="flex flex-row justify-between space-x-2">
      <Input
        class="block w-full text-gray-900 border-gray-300 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 pl-11 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 sm:text-base"
        readonly
        bind:value={traveler_count}
      />
      <button
        type="button"
        class="px-5 mb-1 mr-2 text-lg font-semibold rounded-lg focus:outline-none text-primary-ink bg-accent-col hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
        on:click={() => {
          if (traveler_count < 15) traveler_count++;
        }}
      >
        +
      </button>
      <button
        type="button"
        class="px-5 mb-1 mr-2 text-lg font-semibold rounded-lg focus:outline-none text-primary-ink bg-accent-col hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
        on:click={() => {
          if (traveler_count > 0) traveler_count--;
        }}
      >
        -
      </button>
    </div>

    <Label for="partners" class="mb-2 text-base font-semibold text-primary-ink"
      >Expected Duration of Tour (in days)</Label
    >
    <div class="flex flex-row justify-between space-x-2">
      <Input
        class="block w-full text-gray-900 border-gray-300 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 pl-11 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 sm:text-base"
        readonly
        bind:value={day_count}
      />
      <button
        type="button"
        class="px-5 mb-1 mr-2 text-lg font-semibold rounded-lg focus:outline-none text-primary-ink bg-accent-col hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
        on:click={() => {
          if (day_count < 30) day_count++;
        }}
      >
        +
      </button>
      <button
        type="button"
        class="px-5 mb-1 mr-2 text-lg font-semibold rounded-lg focus:outline-none text-primary-ink bg-accent-col hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
        on:click={() => {
          if (day_count > 1) day_count--;
        }}
      >
        -
      </button>
    </div>
    <button
      type="button"
      class="focus:outline-none text-primary-ink bg-accent-col hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg text-lg font-semibold px-5 py-2.5 mx-auto dark:focus:ring-yellow-900"
      on:click|stopPropagation={() => {
        if ($plan_store.cities.length == 0) {
          unique = {};
          show_error = true;
        } else if (date_error_message.length > 0) {
          unique = {};
          show_error = true;
        } else {
          show_error = false;
          plan_store.update((current_data) => {
            current_data.cities = $plan_store.cities;
            current_data.buddy_count = traveler_count;
            current_data.start_date = start_date;
            current_data.duration = day_count;
            return current_data;
          });
          goto("/newplan/destinations");
        }
      }}>Proceed</button
    >
    {#if show_error}
      {#key unique}
        <Alert color="red" dismissable>
          <Icon name="info-circle-solid" slot="icon" class="w-4 h-4" />
          {#if $plan_store.cities.length == 0}
            You should select a city to travel.<br />
          {/if}
          {#if date_error_message.length > 0}
            {date_error_message}
          {/if}
        </Alert>
      {/key}
    {/if}
  </div>
{/if}
