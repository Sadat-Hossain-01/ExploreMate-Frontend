<script lang="ts">
  import type { Destination } from "./destination";
  import PlanStore from "$lib/stores/planstore";
  import Destinationcard from "./destinationcard.svelte";
  import { Search } from "flowbite-svelte";

  let city: string = "";
  let destination_input: string = "";

  PlanStore.subscribe((data) => {
    city = data.City;
  });

  //   declare a dummy list of 10 destinations
  let suggested_destinations: Array<Destination> = [
    {
      id: 1,
      name: "Cox's Bazar",
      description:
        "Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it...",
      image_url: "https://source.unsplash.com/random/200x200?sig=1",
      rating: 4.5,
      selected: false,
      time: 30, // in minutes
      cost: 1000, // in BDT
    },
    {
      id: 2,
      name: "Sajek",
      description:
        "Sajek is a union located in the north of Chittagong Hill Tracts. It is famous for its natural environment and is surrounded by mountains, dense forest, and grasslands...",
      image_url: "https://source.unsplash.com/random/200x200?sig=2",
      rating: 4.5,
      selected: false,
      time: 30, // in minutes
      cost: 1000, // in BDT
    },
    {
      id: 3,
      name: "Sundarbans",
      description:
        "The Sundarbans is a mangrove area in the delta formed by the confluence of the Ganges, Brahmaputra and Meghna Rivers in the Bay of Bengal. Really? I did not know that, oh my god. It spans from the Hooghly...",
      image_url: "https://source.unsplash.com/random/200x200?sig=3",
      rating: 4.5,
      selected: false,
      time: 30, // in minutes
      cost: 1000, // in BDT
    },
    {
      id: 4,
      name: "Sylhet",
      description:
        "Sylhet, is a metropolitan city in northeastern Bangladesh. It is the administrative seat of Sylhet Division. The city is located on the right bank of the Surma River...",
      image_url: "https://source.unsplash.com/random/200x200?sig=4",
      rating: 4.5,
      selected: false,
      time: 30, // in minutes
      cost: 1000, // in BDT
    },
    {
      id: 5,
      name: "Bandarban",
      description:
        "Bandarban, officially known as the Bandarban Hill District, is a hill district in the Chittagong Division of Bangladesh. It is one of the three districts that make up...",
      image_url: "https://source.unsplash.com/random/200x200?sig=5",
      rating: 4.1,
      selected: false,
      time: 30, // in minutes
      cost: 1000, // in BDT
    },
  ];

  let filtered_destinations: Array<Destination> = [];
  let selected_destinations: Array<Destination> = [];
  let showable_destinations: Array<Destination> = [];
  let show_selected: boolean = true;
  $: {
    selected_destinations = suggested_destinations.filter(
      (destination) => destination.selected
    );
    filtered_destinations = suggested_destinations.filter((destination) =>
      destination.name.toLowerCase().includes(destination_input.toLowerCase())
    );
    if (show_selected) {
      showable_destinations = selected_destinations;
    } else {
      showable_destinations = filtered_destinations;
    }
  }
</script>

<div class="z-50 flex flex-col-reverse lg:flex-row">
  <section class="w-full lg:w-[55%]">
    <div class="relative flex flex-col">
      <div class="mb-8 mt-12 px-3 md:px-12">
        <div class="flex flex-col justify-start gap-4">
          <h2 class="text-3xl font-bold md:text-4xl">Top Sights in {city}</h2>
        </div>
        <p class="mt-4 text-base primary-text-ink md:text-lg">
          Select the destinations you would like to include for your visit to {city}
        </p>
      </div>
      <div class="flex flex-grow px-3 pb-52 md:px-12">
        <div class="w-full">
          <div class="mb-8 flex items-stretch gap-2 md:gap-3">
            <div class="relative w-full basis-10/12">
              <Search
                bind:value={destination_input}
                placeholder={"Search Destinations"}
              />
            </div>
            <div class="w-full basis-2/12">
              <button
                class="flex items-center w-full justify-center bg-accent-col px-4 py-2 text-sm font-medium text-primary-ink rounded-md hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                on:click={() => {
                  show_selected = !show_selected;
                }}
              >
                <span class="hidden h-full whitespace-nowrap md:block"
                  >{show_selected
                    ? "Show Suggestions"
                    : "Show Selections"}</span
                >
              </button>
            </div>
          </div>
          <div>
            <div
              class="grid grid-flow-row-dense grid-cols-1 gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
            >
              {#each showable_destinations as destination}
                <Destinationcard bind:destination />
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section
    class="fixed right-0 h-full w-full overflow-hidden border-l border-solid border-gray-200 transition-transform lg:w-[45%] translate-x-full md:block lg:translate-x-0"
  >
    <div class="relative flex h-full w-full flex-row-reverse">
      Map Here
      {#each selected_destinations as selected_destination}
        {selected_destination.name}
      {/each}
    </div>
  </section>
</div>
