<script lang="ts">
  import { Input, Label, Search, Heading, Span, Alert } from "flowbite-svelte";
  import plan_store from "$lib/stores/planstore";
  import { goto } from "$app/navigation";
  import { Icon } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  export let data;

  let unique = {};

  let prev_city_input: string = "";
  let city_input: string = "";
  let city_input_ok: boolean = false;
  let traveler_count: number = 0;
  let day_count: number = 3;
  let suggestion_open: boolean = false;
  let show_error: boolean = false;
  let start_date: string = "";
  let date_error_message: string = "";
  let city_error_message: string = "";

  plan_store.subscribe((current_data) => {
    if (current_data.choice_level != 0) current_data.choice_level = 0;
  });

  $: {
    // console.log(start_date, day_count, traveler_count);
    if (start_date.length == 0) {
      date_error_message = "Please select a start date.";
    } else if (!checkDateValidity(start_date)) {
      date_error_message = "Please select a valid start date in future.";
    } else {
      date_error_message = "";
      if (city_input_ok) show_error = false;
    }
  }

  let cities: string[] = [];
  data.cities.forEach((city: any) => {
    cities.push(city.name + ", " + city.state + ", " + city.country);
  });
  let filtered_cities: string[] = [];

  $: {
    if (city_input.length > 0 && city_input !== prev_city_input) {
      suggestion_open = true;
      city_input_ok = false;
      prev_city_input = city_input;
      filtered_cities = cities.filter((city) =>
        city.toLowerCase().includes(city_input.toLowerCase())
      );
      filtered_cities = filtered_cities.slice(0, 7);
    }
  }

  const checkDateValidity = (date: string) => {
    let today = new Date();
    let input_date = new Date(date);
    if (input_date < today) {
      return false;
    }
    return true;
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
<svelte:window on:click|stopPropagation={() => (suggestion_open = false)} />

<div class="flex flex-col w-1/3 h-screen pt-10 mx-auto my-5 space-y-3 relative">
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
    <span>Where do you want to go to?</span>
    <Search bind:value={city_input} placeholder={"Search Cities"} />
  </Label>
  <div>
    {#if suggestion_open && city_input.length > 0 && filtered_cities.length > 0}
      <div
        id="dropdown"
        class="absolute z-20 w-full bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700"
      >
        <ul
          class="w-full py-1 text-base text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          {#each filtered_cities as city}
            <li>
              <button
                class="block w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                on:click|stopPropagation={() => {
                  prev_city_input = city_input = city;
                  city_input_ok = true;
                  filtered_cities = [];
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
    on:click={() => {
      if (!city_input_ok) {
        unique = {};
        city_error_message = "Please select a city to travel.";
        show_error = true;
      } else if (date_error_message.length > 0) {
        unique = {};
        show_error = true;
        // error message is already set
      } else {
        show_error = false;
        plan_store.update((current_data) => {
          current_data.city = city_input;
          current_data.start_date = start_date;
          current_data.duration = day_count;
          current_data.choice_level = 1;
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
        {#if !city_input_ok}
          You should select a city to travel.<br />
        {/if}
        {#if date_error_message.length > 0}
          {date_error_message}
        {/if}
      </Alert>
    {/key}
  {/if}
</div>
