<script lang="ts">
  import type { Destination } from "./destination";
  import { Rating } from "flowbite-svelte";
  export let destination: Destination;

  const shorten_text = (text: string, max_length: number) => {
    if (text.length > max_length) {
      return text.substring(0, max_length) + "...";
    } else {
      return text;
    }
  };
</script>

<div class="flex w-full gap-2">
  <div
    class="relative flex w-full items-start justify-center gap-0 md:items-stretch lg:gap-12"
  >
    <div
      class="flex h-full w-full cursor-pointer flex-col rounded-xl transition-all hover:shadow-md transition-colors"
    >
      <button
        class="min-h-[10rem] w-full cursor-pointer overflow-hidden rounded-t-xl bg-cover bg-center"
        style="background-image: url('{destination.image_url}')"
      >
        <div
          class="group flex h-full w-full flex-col items-center justify-center gap-1 text-white hover:bg-[#0000006e]"
        />
      </button>
      <div
        class="rounded-b-xl flex flex-grow flex-col rounded-b-xl border border-solid border-gray-200 p-3 pt-1"
      >
        <div>
          <div>
            <div class="flex items-center justify-between">
              <h3 class="line-clamp-1 text-xl font-bold">
                {destination.name}
              </h3>
              <div class="relative -right-3">
                <div class="inline-flex items-center">
                  <label
                    class="relative flex items-center cursor-pointer p-3 rounded-full"
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
              class="block py-3 text-sm text-tp-purple-2 underline md:hidden"
            />
          </div>
          <div class="mt-1 flex flex-wrap items-center gap-2">
            <Rating id="example-3" total={5} rating={destination.rating}>
              <p
                slot="text"
                class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                {destination.rating}
              </p>
            </Rating>
            <p class="text-sm text-gray-60">69 Ratings</p>
          </div>
          <p class="mb-5 mt-2.5 line-clamp-2 text-sm">
            {shorten_text(destination.description, 100)}
          </p>
        </div>
        <div class="flex justify-between text-base">
          <p class=" text-blue-gray-400">
            {destination.time.toString() + " minutes"}
          </p>
          <div class="ml-auto">{destination.cost}</div>
        </div>
      </div>
    </div>
  </div>
</div>
