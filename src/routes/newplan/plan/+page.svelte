<script lang="ts">
    import { Accordion, GradientButton, Span } from "flowbite-svelte";

    import type { DayItem } from "$lib/interfaces/dayitem";
    import type { Day } from "$lib/interfaces/day";
    import DayAccordian from "./day.svelte";
    import Map from "../map.svelte";

    const dummy_daywise_plan: Day[] = [
        {
            date: "2021-10-10",
            items: [
                <DayItem>{
                    name: "Eiffel Tower",
                    lat: 48.8584,
                    lng: 2.2945,
                    start_time: "10:00",
                    end_time: "11:00",
                    description: "This is a description",
                },
                <DayItem>{
                    name: "Louvre Museum",
                    lat: 48.8606,
                    lng: 2.3376,
                    start_time: "11:00",
                    end_time: "12:00",
                    description: "This is a description",
                },
                <DayItem>{
                    name: "Arc de Triomphe",
                    lat: 48.8738,
                    lng: 2.295,
                    start_time: "12:00",
                    end_time: "13:00",
                    description: "This is a description",
                },
            ],
        },
        {
            date: "2021-10-11",
            items: [
                <DayItem>{
                    name: "Eiffel Tower",
                    lat: 48.8584,
                    lng: 2.2945,
                    start_time: "10:00",
                    end_time: "11:00",
                    description: "This is a description",
                },
                <DayItem>{
                    name: "Louvre Museum",
                    lat: 48.8606,
                    lng: 2.3376,
                    start_time: "11:00",
                    end_time: "12:00",
                    description: "This is a description",
                },
                <DayItem>{
                    name: "Arc de Triomphe",
                    lat: 48.8738,
                    lng: 2.295,
                    start_time: "12:00",
                    end_time: "13:00",
                    description: "This is a description",
                },
            ],
        },
        {
            date: "2021-10-12",
            items: [
                <DayItem>{
                    name: "Eiffel Tower",
                    lat: 48.8584,
                    lng: 2.2945,
                    start_time: "10:00",
                    end_time: "11:00",
                    description: "This is a description",
                },
                <DayItem>{
                    name: "Louvre Museum",
                    lat: 48.8606,
                    lng: 2.3376,
                    start_time: "11:00",
                    end_time: "12:00",
                    description: "This is a description",
                },
                <DayItem>{
                    name: "Arc de Triomphe",
                    lat: 48.8738,
                    lng: 2.295,
                    start_time: "12:00",
                    end_time: "13:00",
                    description: "This is a description",
                },
            ],
        },
    ];

    const items = Array(dummy_daywise_plan.length).fill(false);
    const open_all = () => items.forEach((_, i) => (items[i] = true));
    const close_all = () => items.forEach((_, i) => (items[i] = false));
</script>

<div class="flex">
    <div class="flex-col w-[55%] space-y-8 px-12">
        <div class="mt-8 text-4xl font-bold tracking-wider">
            <Span gradient>Tour Plan</Span>
        </div>
        <div class="flex space-x-4">
            <button
                class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-semibold text-primary-ink rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                on:click={open_all}
            >
                <span
                    class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                >
                    Open All
                </span>
            </button>
            <button
                class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-semibold text-primary-ink rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                on:click={close_all}
            >
                <span
                    class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                >
                    Close All
                </span>
            </button>
        </div>
        <Accordion multiple>
            {#each dummy_daywise_plan as day, i}
                <DayAccordian {day} is_open={items[i]} day_number={i} />
            {/each}
        </Accordion>
    </div>
    <div
        class="fixed right-0 h-full w-full overflow-hidden border-l border-solid border-gray-200 transition-transform lg:w-[45%] translate-x-full md:block lg:translate-x-0"
    >
        <div id="map" class="relative flex flex-row-reverse w-full h-full">
            <Map />
        </div>
    </div>
</div>
