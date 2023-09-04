<script lang="ts">
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
  import plan_store from "$lib/stores/planstore";
  import { hashmap } from "$lib/interfaces/plan";
  let choice_level: number;
  plan_store.subscribe((current_data) => {
    choice_level = current_data.choice_level;
  });
</script>

<div class="grow bg-primary-col">
  <div class="w-full pb-2 fixed top-[60px] z-10">
    <Breadcrumb solid>
      {#each Array(choice_level + 1) as _, i}
        <BreadcrumbItem
          href={hashmap[i]?.[1]}
          active={i === choice_level}
          aria-current={i === choice_level ? "page" : undefined}
        >
          {hashmap[i]?.[0]}
        </BreadcrumbItem>
      {/each}
    </Breadcrumb>
  </div>
  <slot />
</div>
