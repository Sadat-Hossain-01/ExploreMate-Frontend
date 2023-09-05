<script lang="ts">
    import { AccordionItem } from "flowbite-svelte";
    import { Timeline } from "flowbite-svelte";

    import type { Day } from "$lib/interfaces/day";
    import Dayitem from "./dayitem.svelte";

    export let is_open: boolean;
    export let day_number: number;
    export let day: Day;
    day_number += 1;
</script>

<AccordionItem bind:open={is_open}>
    <span class="text-bold text-primary-ink" slot="header"
        >{"Day " + day_number + " | " + day.date}</span
    >
    <Timeline>
        {#each day.items as item}
            <Dayitem day_item={item} />
        {/each}
    </Timeline>
</AccordionItem>
