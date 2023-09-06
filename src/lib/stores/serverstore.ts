// to store the server url

import { readable } from "svelte/store";
const server_store = readable("https://exploremate-express-api.vercel.app");

export default server_store;
