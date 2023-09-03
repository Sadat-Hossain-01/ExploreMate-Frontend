<script lang="ts">
    import type { Destination } from "$lib/interfaces/destination";
    import plan_store from "$lib/stores/planstore";
    import Destinationcard from "./destinationcard.svelte";
    import { Search } from "flowbite-svelte";
    import Map from "../map.svelte";
    export let data;

    let city: string = "";
    let destination_input: string = "";

    plan_store.subscribe((data) => {
        city = data.city;
    });

    let suggested_destinations: any = data.destinations;

    let filtered_destinations: Array<Destination> = [];
    let selected_destinations: Array<Destination> = [];
    let showable_destinations: Array<Destination> = [];
    let show_selected: boolean = false;
    $: {
        selected_destinations = suggested_destinations.filter(
            (destination) => destination.selected
        );
        filtered_destinations = suggested_destinations.filter((destination) =>
            destination.name
                .toLowerCase()
                .includes(destination_input.toLowerCase())
        );
        if (show_selected) {
            showable_destinations = selected_destinations;
        } else {
            showable_destinations = filtered_destinations;
        }
        plan_store.update((data) => {
            data.destinations = selected_destinations;
            return data;
        });
    }
</script>

<svelte:head>
    <title>Choose Destinations</title></svelte:head
>

<div class="z-50 flex flex-col-reverse lg:flex-row">
    <section class="w-full lg:w-[55%]">
        <div class="relative flex flex-col">
            <div class="px-3 mt-12 mb-8 md:px-12">
                <div class="flex flex-col justify-start gap-4">
                    <h2 class="text-3xl font-bold md:text-4xl">
                        Top Sights in {city}
                    </h2>
                </div>
                <p class="mt-4 text-base primary-text-ink md:text-lg">
                    Select the destinations you would like to include for your
                    visit to {city}
                </p>
            </div>
            <div class="flex flex-grow px-3 pb-52 md:px-12">
                <div class="w-full">
                    <div class="flex items-stretch gap-2 mb-8 md:gap-3">
                        <div class="relative w-full basis-10/12">
                            <Search
                                bind:value={destination_input}
                                placeholder={"Search Destinations"}
                            />
                        </div>
                        <div class="w-full basis-2/12">
                            <button
                                class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-accent-col text-primary-ink hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                on:click={() => {
                                    show_selected = !show_selected;
                                }}
                            >
                                <span
                                    class="hidden h-full whitespace-nowrap md:block"
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
        <div id="map" class="relative flex flex-row-reverse w-full h-full">
            <Map />
        </div>
    </section>
</div>
