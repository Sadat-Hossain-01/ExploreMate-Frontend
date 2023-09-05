<script>
  import Header from "./Header.svelte";
  import "./styles.css";
  import "../app.css";
</script>

<div class="flex flex-col min-h-screen">
  <Header />
  <div class="grow bg-primary-col">
    <slot />
  </div>
</div>
