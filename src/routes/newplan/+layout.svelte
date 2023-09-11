<script lang="ts">
  import plan_store from "$lib/stores/planstore";
  import { hashmap } from "$lib/interfaces/plan";
  import { goto } from "$app/navigation";
  import { loading_store } from "$lib/stores/serverstore";

  // $: console.log("loading store is ", $loading_store);
</script>

<div class="grow bg-primary-col">
  <div
    class="w-full pb-2 sticky top-[60px] z-10 pt-5 pl-5 bg-primary-col flex-row"
  >
    {#if $loading_store === false}
      <ol class="inline-flex items-center space-x-1 md:space-x-3 w-1/2">
        {#each Array($plan_store.choice_progress + 1) as _, i}
          <li aria-current="page">
            <div class="flex items-center">
              <svg
                class="w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              {#if i === $plan_store.choice_progress}
                <span
                  class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
                  >{hashmap[i]?.[0]}</span
                >
              {:else}
                <!-- <a
                href={hashmap[i]?.[1]}
                class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                on:click|stopPropagation={() => {
                  $plan_store.choice_progress = i;
                  goto(hashmap[i]?.[1]);
                }}> -->
                <p
                  class="ml-1 text-sm font-medium text-gray-700 md:ml-2 dark:text-gray-400"
                >
                  {hashmap[i]?.[0]}
                </p>
                <!-- </a
              > -->
              {/if}
            </div>
          </li>
        {/each}
      </ol>
      <div class="flex justify-end mx-5 font-bold my-auto">
        <i class="fa-solid fa-money-bill my-auto mr-5" />
        {#if !$plan_store.plan_created}
          ${Math.round(
            ($plan_store.destination_estimated_budget +
              $plan_store.hotel_estimated_budget +
              $plan_store.restaurant_estimated_budget +
              $plan_store.activity_estimated_budget +
              $plan_store.event_estimated_budget +
              Number.EPSILON) *
              10000
          ) / 10000}
        {:else}
          ${Math.round($plan_store.plan_final_cost * 10000) / 10000}
        {/if}
      </div>
    {/if}
  </div>
  <slot />
</div>
