import { readable, writable } from "svelte/store";
const server_store = readable("https://exploremate-express-api.vercel.app");
const loading_store = writable(false); // if any api fetch is in progress

export default server_store;
export { loading_store };
