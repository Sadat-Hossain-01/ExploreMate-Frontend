import { writable } from "svelte/store";
import type { User } from "../interfaces/user";

const plan_store = writable<User>({
  id: "1",
  name: "Nafis Tahmid",
  email: "1905002@ugrad.cse.buet.ac.bd",
  avatar_link: "https://source.unsplash.com/random",
});

export default plan_store;
