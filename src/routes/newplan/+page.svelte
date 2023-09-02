<script lang="ts">
  import { Input, Label, Search, Heading, Span, Alert } from "flowbite-svelte";
  import plan_store from "$lib/stores/planstore";
  import { goto } from "$app/navigation";
  import { Icon } from "flowbite-svelte-icons";

  let unique = {};

  let prev_city_input: string = "";
  let city_input: string = "";
  let input_ok: boolean = false;
  let traveler_count: number = 0;
  let day_count: number = 3;
  let suggestion_open: boolean = false;
  let show_error: boolean = false;
  let cities = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Rangpur",
    "Mymensingh",
    "Cox's Bazar",
    "Calcutta",
    "Chennai",
    "Canberra",
    "Cairo",
    "Cape Town",
  ];
  let filtered_cities: string[] = [];

  $: {
    if (city_input.length > 0 && city_input !== prev_city_input) {
      suggestion_open = true;
      input_ok = false;
      prev_city_input = city_input;
      filtered_cities = cities.filter((city) =>
        city.toLowerCase().includes(city_input.toLowerCase())
      );
    }
  }

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

<svelte:window on:click|stopPropagation={() => (suggestion_open = false)} />

<div class="flex flex-col w-1/3 h-screen pt-10 mx-auto my-5 space-y-3">
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
    <span>When does your tour start?</span>
    <Input type="date" placeholder="Start Date" size="md" />
  </Label>

  <Label for="partners" class="mb-2 text-base font-semibold text-primary-ink"
    >Expected Duration of Tour (in days)</Label
  >
  <div class="flex flex-row justify-between space-x-2">
    <Input
      class="block w-full text-gray-900 border-gray-300 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 pl-11 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 sm:text-base"
      readonly
      value={day_count.toString()}
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

  <Label for="partners" class="mb-2 text-base font-semibold text-primary-ink"
    >How many people will possibly go with you?</Label
  >
  <div class="flex flex-row justify-between space-x-2">
    <Input
      class="block w-full text-gray-900 border-gray-300 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 pl-11 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 sm:text-base"
      readonly
      value={traveler_count.toString()}
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

  <Label class="mb-2 space-y-2 text-base font-semibold text-primary-ink">
    <span>Where do you want to go to?</span>
    <Search bind:value={city_input} placeholder={"Search Cities"} />
  </Label>

  <div class="grid place-items-center">
    {#if suggestion_open && city_input.length > 0 && filtered_cities.length > 0}
      <div
        id="dropdown"
        class="z-10 w-full bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700"
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
                  input_ok = true;
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

    <button
      type="button"
      class="z-0 fixed bottom-10 focus:outline-none text-primary-ink bg-accent-col hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg text-lg font-semibold px-5 py-2.5 mx-auto dark:focus:ring-yellow-900"
      on:click={() => {
        if (!input_ok) {
          unique = {};
          show_error = true;
          return;
        } else {
          show_error = false;
          plan_store.update((current_data) => {
            current_data.city = city_input;
            return current_data;
          });
          goto(`/newplan/destinations`);
        }
      }}>Proceed</button
    >
    {#if show_error}
      {#key unique}
        <Alert color="red" dismissable>
          <Icon name="info-circle-solid" slot="icon" class="w-4 h-4" />
          You should select a city to travel.
        </Alert>
      {/key}
    {/if}
  </div>
</div>
