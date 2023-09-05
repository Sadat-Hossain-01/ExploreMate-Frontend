<script lang="ts">
  import ShowEvents from "./show_events.svelte";
  import ShowActivities from "./show_activities.svelte";
  import type { Event } from "$lib/interfaces/event";
  import type { Activity } from "$lib/interfaces/activity";

  export let data: any;

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
</script>

<svelte:head>
  <title>Choose Events & Activities</title></svelte:head
>

<div class="z-50 flex flex-col-reverse lg:flex-row">
  <section class="w-full lg:w-[50%]">
    <ShowEvents bind:suggested_events />
  </section>
  <section class="w-full lg:w-[50%]">
    <ShowActivities bind:suggested_activities />
  </section>
</div>
