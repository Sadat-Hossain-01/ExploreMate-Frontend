<script lang="ts">
  import type { Event } from "$lib/interfaces/event";
  import type { Activity } from "$lib/interfaces/activity";
  import Eventcard from "./eventcard.svelte";
  import Activitycard from "./activitycard.svelte";
  import { Search } from "flowbite-svelte";
  import plan_store from "$lib/stores/planstore";

  let event_input: string = "";
  let activity_input: string = "";

  // declare a dummy list of 10 events
  let suggested_events: Array<Event> = [
    {
      id: "1",
      name: "Jobbarer Bolikhela",
      description:
        "Jobbarer Bolikhela is a festival of the indigenous people of the Chittagong Hill Tracts. It is celebrated in the month of Falgun (February–March) every year. The festival is celebrated to welcome the new year and to say goodbye to the previous year. The festival is celebrated with great enthusiasm and joy. The festival is celebrated for three days. The festival is celebrated with the participation of the indigenous people of the Chittagong Hill Tracts. The festival is celebrated with the participation of the indigenous people of the Chittagong Hill Tracts. The festival is celebrated with the participation of the indigenous people of the Chittagong Hill Tracts. The festival is celebrated with the participation of the indigenous people of the Chittagong Hill Tracts.",
      image_url:
        "https://www.tbsnews.net/sites/default/files/styles/big_2/public/images/2022/04/25/ctg_jabbar_boli_khala_photo3.jpg",
      rating: 4.5,
      selected: false,
      rating_count: 100,
      start_time: "05-09-2023 10:00AM",
      end_time: "05-09-2023 10:00PM",
      min_cost: 10,
      max_cost: 20,
    },
    {
      id: "2",
      name: "Bengali New Year",
      description:
        "Pohela Boishakh, also known as Bangla New Year, is the first day of the Bengali calendar. It is celebrated on 14 April as a national holiday in Bangladesh, and on 14 or 15 April in the Indian states of West Bengal, Tripura and part of Assam by people of Bengali heritage, irrespective of their religious faith.",
      image_url:
        "https://cdn.cdnparenting.com/articles/2021/03/15152825/Bengali-New-Year-History-and-Facts.webp",
      rating: 4.5,
      selected: false,
      rating_count: 100,
      start_time: "05-09-2023 10:00AM",
      end_time: "05-09-2023 10:00PM",
      min_cost: 10,
      max_cost: 20,
    },
    {
      id: "3",
      name: "Eid-ul-Fitr",
      description:
        "Eid al-Fitr, also called the 'Festival of Breaking the Fast', is a religious holiday celebrated by Muslims worldwide that marks the end of the month-long dawn-to-sunset fasting of Ramadan. This religious Eid is the only day in the month of Shawwal during which Muslims are not permitted to fast.",
      image_url:
        "https://gumlet.assettype.com/theceo%2F2023-03%2Fc10c711d-43d3-47e5-ac32-7e65af32d739%2FEID_UL_FITR__The_Auspicious_Festival_Of_Islam.jpg?w=1200&auto=format%2Ccompress&ogImage=true&enlarge=true",
      rating: 4.5,
      selected: false,
      rating_count: 100,
      start_time: "05-09-2023 10:00AM",
      end_time: "05-09-2023 10:00PM",
      min_cost: 10,
      max_cost: 20,
    },
  ];

  // events
  let event_suggestions: Array<Event> = suggested_events;
  let event_selections: Array<Event> = [];
  let filtered_event_suggestions: Array<Event> = []; // filtered based on input
  let filtered_event_selections: Array<Event> = []; // filtered based on input
  let showable_events: Array<Event> = [];
  let show_selected_events: boolean = false;
  $: {
    event_selections = event_suggestions.filter((event: any) => event.selected);
    filtered_event_suggestions = event_suggestions.filter((event: any) =>
      event.name.toLowerCase().includes(event_input.toLowerCase())
    );
    filtered_event_selections = event_selections.filter((event: any) =>
      event.name.toLowerCase().includes(event_input.toLowerCase())
    );
    if (show_selected_events && event_input.length > 0)
      showable_events = filtered_event_selections;
    else if (show_selected_events && event_input.length == 0)
      showable_events = event_selections;
    else if (!show_selected_events && event_input.length > 0)
      showable_events = filtered_event_suggestions;
    else showable_events = event_suggestions;
    $plan_store.events = event_selections;
  }

  // activities
  // declare a dummy list of 10 activities
  let suggested_activities: Array<Activity> = [
    {
      id: 1,
      name: "Rowing",
      description:
        "Rowing is the act of propelling a boat using the motion of oars in the water by displacing water to propel the boat forward. Rowing and paddling are similar but the difference is that rowing requires oars to have a mechanical connection with the boat, while paddles (used for paddling) are hand-held and have no mechanical connection.",
      image_url:
        "https://www.shutterstock.com/shutterstock/photos/220694014/display_1500/stock-photo-rowers-in-eight-oar-rowing-boats-on-the-tranquil-lake-220694014.jpg",
      rating: 4.5,
      selected: false,
      rating_count: 100,
      min_cost: 10,
      max_cost: 20,
    },
    {
      id: 1,
      name: "Rowing",
      description:
        "Rowing is the act of propelling a boat using the motion of oars in the water by displacing water to propel the boat forward. Rowing and paddling are similar but the difference is that rowing requires oars to have a mechanical connection with the boat, while paddles (used for paddling) are hand-held and have no mechanical connection.",
      image_url:
        "https://www.shutterstock.com/shutterstock/photos/220694014/display_1500/stock-photo-rowers-in-eight-oar-rowing-boats-on-the-tranquil-lake-220694014.jpg",
      rating: 4.5,
      selected: false,
      rating_count: 100,
      min_cost: 10,
      max_cost: 20,
    },
    {
      id: 1,
      name: "Rowing",
      description:
        "Rowing is the act of propelling a boat using the motion of oars in the water by displacing water to propel the boat forward. Rowing and paddling are similar but the difference is that rowing requires oars to have a mechanical connection with the boat, while paddles (used for paddling) are hand-held and have no mechanical connection.",
      image_url:
        "https://www.shutterstock.com/shutterstock/photos/220694014/display_1500/stock-photo-rowers-in-eight-oar-rowing-boats-on-the-tranquil-lake-220694014.jpg",
      rating: 4.5,
      selected: false,
      rating_count: 100,
      min_cost: 10,
      max_cost: 20,
    },
  ];

  let activity_suggestions: Array<Activity> = suggested_activities;
  let activity_selections: Array<Activity> = [];
  let filtered_activity_suggestions: Array<Activity> = []; // filtered based on input
  let filtered_activity_selections: Array<Activity> = []; // filtered based on input
  let showable_activities: Array<Activity> = [];
  let show_selected_activities: boolean = false;
  $: {
    activity_selections = activity_suggestions.filter(
      (activity: any) => activity.selected
    );
    filtered_activity_suggestions = activity_suggestions.filter(
      (activity: any) =>
        activity.name.toLowerCase().includes(activity_input.toLowerCase())
    );
    filtered_activity_selections = activity_selections.filter((activity: any) =>
      activity.name.toLowerCase().includes(activity_input.toLowerCase())
    );
    if (show_selected_activities && activity_input.length > 0)
      showable_activities = filtered_activity_selections;
    else if (show_selected_activities && activity_input.length == 0)
      showable_activities = activity_selections;
    else if (!show_selected_activities && activity_input.length > 0)
      showable_activities = filtered_activity_suggestions;
    else showable_activities = activity_suggestions;
    $plan_store.activities = activity_selections;
  }
</script>

<svelte:head>
  <title>Choose Events & Activities</title></svelte:head
>

<div class="z-50 flex flex-col-reverse lg:flex-row">
  <section class="w-full lg:w-[50%]">
    <div class="relative flex flex-col">
      <div class="px-3 mt-12 mb-8 md:px-12">
        <div class="flex flex-col justify-start gap-4">
          <h2 class="text-3xl font-bold md:text-4xl">Top Events to Attend</h2>
        </div>
        <p class="mt-4 text-base primary-text-ink md:text-lg">
          Select the events you would like to visit for your visit
        </p>
      </div>
      <div class="flex flex-grow px-3 pb-52 md:px-12">
        <div class="w-full">
          <div class="flex items-stretch gap-2 mb-8 md:gap-3">
            <div class="relative w-full basis-10/12">
              <Search bind:value={event_input} placeholder={"Search Events"} />
            </div>
            <div class="w-full basis-2/12">
              <button
                class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-accent-col text-primary-ink hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                on:click={() => {
                  show_selected_events = !show_selected_events;
                }}
              >
                <span class="hidden h-full whitespace-nowrap md:block"
                  >{show_selected_events
                    ? "Show Suggestions"
                    : "Show Selections"}</span
                >
              </button>
            </div>
          </div>
          <div>
            <div
              class="grid grid-flow-row-dense grid-cols-1 gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
            >
              {#each showable_events as event}
                <Eventcard bind:event />
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="w-full lg:w-[50%]">
    <div class="relative flex flex-col">
      <div class="px-3 mt-12 mb-8 md:px-12">
        <div class="flex flex-col justify-start gap-4">
          <h2 class="text-3xl font-bold md:text-4xl">
            Top Activities to Explore
          </h2>
        </div>
        <p class="mt-4 text-base primary-text-ink md:text-lg">
          Select the activities you would like to explore for your visit
        </p>
      </div>
      <div class="flex flex-grow px-3 pb-52 md:px-12">
        <div class="w-full">
          <div class="flex items-stretch gap-2 mb-8 md:gap-3">
            <div class="relative w-full basis-10/12">
              <Search
                bind:value={activity_input}
                placeholder={"Search Activities"}
              />
            </div>
            <div class="w-full basis-2/12">
              <button
                class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-accent-col text-primary-ink hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                on:click={() => {
                  show_selected_activities = !show_selected_activities;
                }}
              >
                <span class="hidden h-full whitespace-nowrap md:block"
                  >{show_selected_activities
                    ? "Show Suggestions"
                    : "Show Selections"}</span
                >
              </button>
            </div>
          </div>
          <div>
            <div
              class="grid grid-flow-row-dense grid-cols-1 gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
            >
              {#each showable_activities as activity}
                <Activitycard bind:activity />
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
