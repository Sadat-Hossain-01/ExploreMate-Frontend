import { readable, writable } from "svelte/store";
const server_store = readable("http://localhost:3000"); // to store the server url
const loading_store = writable(false); // if any api fetch is in progress

export default server_store;
export { loading_store };
