<script lang="ts">
    import { TimelineItem } from "flowbite-svelte";
    import type { DayItem } from "$lib/interfaces/dayitem";

    export let day_item: DayItem;
</script>

<TimelineItem
    title={day_item.name}
    date={day_item.start_time + " - " + day_item.end_time}
>
    <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {day_item.description}
    </p>
</TimelineItem>
