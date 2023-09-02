<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownHeader,
    DropdownDivider,
  } from "flowbite-svelte";
  import { page } from "$app/stores";
  import user_store from "$lib/stores/userstore";
  import type { User } from "$lib/interfaces/user";

  let current_user: User = {
    userid: "",
    username: "",
    email: "",
  };

  user_store.subscribe((value) => {
    current_user = value;
  });

  const routes = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Plan Tour", path: "/newplan" },
    { name: "Explore", path: "/newplan/destinations" }, //just for testing
    { name: "Itinerary", path: "/newplan/itinerary" }, // just for testing
  ];
</script>

<Navbar let:hidden let:toggle class="bg-primary-col">
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
    <Avatar
      id="avatar-menu"
      src="https://scontent.fdac24-4.fna.fbcdn.net/v/t39.30808-6/278818457_463589072117492_1085666591316634476_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeGdZibHVVRh4MbqA4wqEgDRYdmr0OJ1bAFh2avQ4nVsAcpsTSsH3ViitPxo-HSxNGq2S5puLTg6rTtFM1h1jLsx&_nc_ohc=ilxQFDtrZyYAX8bIMO4&_nc_ht=scontent.fdac24-4.fna&oh=00_AfDjdXgCwMvsv8Q7bDjiKI8MQg8BSTb79WsOivF5y3rkAw&oe=64F3EFE7"
    />
    <NavHamburger
      on:click={toggle}
      class1="w-full md:flex md:w-auto md:order-1"
    />
  </div>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <span class="block text-sm">{current_user.username}</span>
      <span class="block text-sm font-medium truncate"
        >{current_user.email}</span
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
      <NavLi
        href={route.path}
        active={$page.url.pathname === route.path}
        class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
      >
        {route.name}
      </NavLi>
    {/each}
  </NavUl>
</Navbar>
