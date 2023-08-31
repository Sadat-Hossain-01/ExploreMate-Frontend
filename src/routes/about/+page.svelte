<script lang="ts">
  const modules = [
    "User Authentication",
    "Searching",
    "Planning",
    "Buddy Finder",
    "Reviewing",
    "Rating",
  ];

  import { AccordionItem, Accordion, Button } from "flowbite-svelte";
  const items = Array(2);

  const open_all = () => items.forEach((_, i) => (items[i] = true));
  const close_all = () => items.forEach((_, i) => (items[i] = false));
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="justify-center h-full pt-24 space-x-24 mx-20 w-1/2 mx-auto">
  <Accordion multiple>
    <AccordionItem bind:open={items[0]}>
      <span slot="header">What is ExploreMate?</span>
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        Discover, plan, and connect with ExploreMate. Find diverse travel
        options, popular itineraries, and travel companions for an unforgettable
        journey.​
      </p>
    </AccordionItem>
    <AccordionItem bind:open={items[1]}>
      <span slot="header">Who is this for?</span>
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        Any individuals seeking out new experiences and sharing his/her
        expertise with others.
      </p>
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        In this system, we provide a meeting ground for travel enthusiasts, and
        individuals who have a passion for exploration.
      </p>
      <ul class="list-disc pl-5 dark:text-gray-400 text-gray-500">
        {#each modules as module}
          <li>{module}</li>
        {/each}
      </ul>
    </AccordionItem>
  </Accordion>
</div>
