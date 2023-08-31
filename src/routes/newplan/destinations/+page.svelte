<script lang="ts">
  import type { Destination } from "./destination";
  import type { Plan } from "./plan";
  import PlanStore from "$lib/stores/planstore";
  import Destinationcard from "./destinationcard.svelte";

  let city: string = "";

  PlanStore.subscribe((data) => {
    city = data.City;
  });

  const shorten_text = (text: string, max_length: number) => {
    if (text.length > max_length) {
      return text.substring(0, max_length) + "...";
    } else {
      return text;
    }
  };

  //   declare a dummy list of 10 destinations
  let destinations: Array<Destination> = [
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
        <div>
          <div class="mb-6 flex items-stretch gap-2 md:gap-3">
            Search Box Here
          </div>
          <div>
            <div
              class="grid grid-flow-row-dense grid-cols-1 gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
            >
              {#each destinations as destination}
                <Destinationcard {destination} />
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<!-- <div class="grid grid-cols-2 gap-4">
  <div class="col-span-1">
    Top Sights
    {city}
    <div class="flex flex-grow space-x-3">
      {#each destinations as destination}
        <Card img={destination.image_url} size={"xl"} class="mb-4 h-3/4">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {destination.name}
          </h5>
          <p
            class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight"
          >
            {shorten_text(destination.description, 100)}
          </p>
        </Card>
      {/each}
    </div>
  </div>
  <div class="col-span-1">
    map should be here
  </div>
</div> -->
