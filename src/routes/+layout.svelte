<!-- this will be a common part of all the pages -->

<script>
  import Header from "./Header.svelte";
  import "./styles.css";
  import "../app.css";
</script>

<div class="flex flex-col min-h-screen">
  <Header />
  <main
    class="flex-1 flex flex-col w-full max-w-screen-lg box-border mx-auto my-0 px-8 py-20"
  >
    <slot />
  </main>
</div>
