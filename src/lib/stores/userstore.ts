import { writable } from "svelte/store";
import type { User } from "../interfaces/user";


const plan_store = writable<User>({
    userid: "",
    username: "Nafis Tahmid",
    email: "",
});

export default plan_store;