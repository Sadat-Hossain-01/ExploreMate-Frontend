<script>
    import home_img from "$lib/images/home-1.jpg";
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Home Page" />
</svelte:head>
 
<div class="flex justify-center h-full pt-24 space-x-24">
    <div
        class="flex-col self-center justify-center max-w-xl space-y-6 tracking-wider"
    >
        <div class="text-6xl font-bold text-primary-ink">Life Is Beautiful</div>
        <div class="text-base font-semibold text-gray-500">
            Discover Your Next Adventure with Exploremate - Your Gateway to
            Memorable Journeys Around the World.
        </div>
        <button
            type="button"
            class="focus:outline-none text-primary-ink bg-accent-col hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg text-lg font-semibold px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
            >Signup / Login</button
        >
    </div>
    <div class="">
        <img
            src={home_img}
            width="450"
            height="600"
            class="rounded-lg"
            alt=""
        />
    </div>
</div>

<style>
</style>
