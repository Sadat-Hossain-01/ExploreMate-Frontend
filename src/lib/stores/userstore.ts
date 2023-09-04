import { writable } from "svelte/store";
import type { User } from "../interfaces/user";

const user_store = writable<User>({
  id: "1",
  name: "Shattik Islam Rhythm",
  email: "1905008@ugrad.cse.buet.ac.bd",
  avatar_link: "https://source.unsplash.com/random",
});

export default user_store;
