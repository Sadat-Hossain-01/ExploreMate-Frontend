<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavUl,
    NavHamburger,
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownHeader,
    DropdownDivider,
  } from "flowbite-svelte";
  import user_store from "$lib/stores/userstore";
  import plan_store from "$lib/stores/planstore";

  const routes = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Plan Tour", path: "/newplan" },
  ];
</script>

<Navbar
  let:hidden
  let:toggle
  class="sticky top-0 z-20 bg-white"
  navClass={"px-2 sm:px-4 py-1 w-full"}
>
  <NavBrand href="/">
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      class="h-6 mr-3 sm:h-9"
      alt="ExploreMate Logo"
    />
    <span
      class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
      >ExploreMate</span
    >
  </NavBrand>
  <div class="flex items-center md:order-2">
    <Avatar id="avatar-menu" src={$user_store.avatar_link} />
    <NavHamburger
      on:click={toggle}
      class1="w-full md:flex md:w-auto md:order-1"
    />
  </div>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <span class="block text-sm">{$user_store.name}</span>
      <span class="block text-sm font-medium truncate">{$user_store.email}</span
      >
    </DropdownHeader>
    <DropdownItem>Dashboard</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Tours</DropdownItem>
    <DropdownDivider />
    <DropdownItem>Sign out</DropdownItem>
  </Dropdown>
  <NavUl {hidden}>
    {#each routes as route}
      <li>
        <a
          href={route.path}
          class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          on:click|stopPropagation={() => {
            if (route.name === "Plan Tour") $plan_store.choice_progress = 0;
          }}>{route.name}</a
        >
      </li>
    {/each}
  </NavUl>
</Navbar>
