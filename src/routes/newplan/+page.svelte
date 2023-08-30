<script>
  import { Input, Label, Helper, Button, Checkbox, A } from "flowbite-svelte";
</script>

<div class="flex flex-col min-h-screen pt-10">
  <Label class="space-y-2 mb-6">
    <span>Where do you want to go?</span>
    <Input type="email" placeholder="Search Destination (Cities only)" />
  </Label>
  <Label for="partners" class="mb-2"
    >How many people will possibly go with you?</Label
  >
  <Input type="number" id="partners" placeholder="" required />
</div>
