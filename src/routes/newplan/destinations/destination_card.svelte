<script lang="ts">
  import type { Destination } from "$lib/interfaces/destination";
  import { Rating } from "flowbite-svelte";
  export let destination: Destination;

  const shorten_text = (text: string, max_length: number) => {
    if (text == null) return "No description available";
    if (text.length > max_length) {
      return text.substring(0, max_length) + "...";
    } else {
      return text;
    }
  };
</script>

<div class="flex w-full gap-2">
  <div
    class="relative flex items-start justify-center w-full gap-0 md:items-stretch lg:gap-12"
  >
    <div
      class="flex flex-col w-full h-full transition-all transition-colors cursor-pointer rounded-xl hover:shadow-md"
    >
      <button
        class="min-h-[10rem] w-full cursor-pointer overflow-hidden rounded-t-xl bg-cover bg-center"
        style="background-image: url('{destination.img_url}')"
      >
        <div
          class="group flex h-full w-full flex-col items-center justify-center gap-1 text-white hover:bg-[#0000006e]"
        />
      </button>
      <div
        class="flex flex-col flex-grow p-3 pt-1 border border-gray-200 border-solid rounded-b-xl"
      >
        <div>
          <div>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold line-clamp-1">
                {destination.name}
              </h3>
              <div class="relative -right-3">
                <div class="inline-flex items-center">
                  <label
                    class="relative flex items-center p-3 rounded-full cursor-pointer"
                  >
                    <input
                      bind:checked={destination.selected}
                      type="checkbox"
                      class="peer relative appearance-none w-5 h-5 rounded-md cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-light-green-500 checked:border-light-green-500 checked:before:bg-light-green-500 border border-solid border-gray-500 !p-0 bg-white"
                    />
                  </label>
                </div>
              </div>
            </div>
            <button
              class="block py-3 text-sm underline text-tp-purple-2 md:hidden"
            />
          </div>
          <div class="flex flex-wrap items-center gap-2 mt-1">
            <Rating id="example-3" total={5} rating={destination.rating}>
              <p
                slot="text"
                class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                {destination.rating}
              </p>
            </Rating>
            <p class="text-sm text-gray-60">
              {destination.rating_count} Ratings
            </p>
          </div>
          <p class="mb-5 mt-2.5 line-clamp-2 text-sm">
            {shorten_text(destination.description, 100)}
          </p>
        </div>
        <div class="flex justify-between text-base">
          <p class=" text-blue-gray-400">
            {destination.estimated_time.toString() + " hours"}
          </p>
          <div class="ml-auto">
            {"$" + destination.estimated_cost}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
