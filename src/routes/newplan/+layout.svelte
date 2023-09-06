<script lang="ts">
    import plan_store from "$lib/stores/planstore";
    import { hashmap } from "$lib/interfaces/plan";
    import { goto } from "$app/navigation";
</script>

<div class="grow bg-primary-col">
    <slot />
</div>
