// to store the server url

import { readable } from "svelte/store";
const server_store = readable("http://localhost:3000");

export default server_store;
