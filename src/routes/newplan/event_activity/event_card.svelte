<script lang="ts">
  import type { Event } from "$lib/interfaces/event";
  import { Rating } from "flowbite-svelte";
  export let event: Event;

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
        style="background-image: url('{event.image_url}')"
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
                {event.name}
              </h3>
              <div class="relative -right-3">
                <div class="inline-flex items-center">
                  <label
                    class="relative flex items-center p-3 rounded-full cursor-pointer"
                  >
                    <input
                      bind:checked={event.selected}
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
            <Rating id="example-3" total={5} rating={event.rating}>
              <p
                slot="text"
                class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                {event.rating}/5
              </p>
            </Rating>
            <p class="text-sm text-gray-60">{event.rating_count} Ratings</p>
          </div>
          <p class="mb-5 mt-2.5 line-clamp-2 text-sm">
            {shorten_text(event.description, 100)}
          </p>
        </div>
        <div class="flex justify-between text-base text-center font-bold">
          <div class="flex items-center gap-2 w-full">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              />
            </svg>
            {event.min_cost} - {event.max_cost} USD
          </div>
        </div>
        <div class="flex justify-between text-base text-center font-bold">
          <div class="flex items-center gap-2">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"
              />
            </svg>
            {event.start_time}<br />
            {event.end_time}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
