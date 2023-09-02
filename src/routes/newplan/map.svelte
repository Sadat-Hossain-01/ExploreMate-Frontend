<script type="ts">
    import { onMount } from "svelte";
    import plan_store from "$lib/stores/planstore";

    let container;
    let map;
    let markers = [];
    let zoom = 8;
    let center = { lat: 41.00468597585661, lng: 28.961356447690868 };

    function update_map(data) {
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        data.destinations.forEach((destination) => {
            let marker = new google.maps.Marker({
                position: { lat: destination.lat, lng: destination.lng },
                map: map,
                label: {
                    text: destination.name,
                    color: "black",
                    fontFamily: "Judson",
                    fontSize: "18px",
                    fontWeight: "bold",
                },
                icon: {
                    url: "https://imgtr.ee/images/2023/09/02/e46582800a0159bcc0f42d289e068628.png",
                    scaledSize: new google.maps.Size(64, 64),
                },
            });
            markers.push(marker);
        });
        console.log("typeof map" + typeof map);

        if (map && data.destinations.length > 0) {
            map.setCenter({
                lat: data.destinations[data.destinations.length - 1].lat,
                lng: data.destinations[data.destinations.length - 1].lng,
            });
        }
    }

    onMount(async () => {
        map = new google.maps.Map(container, {
            zoom: zoom,
            center: center,
        });
        update_map($plan_store);
    });

    plan_store.subscribe((data) => {
        update_map(data);
    });
</script>

<div class="full-screen" bind:this={container} />

<style>
    .full-screen {
        width: 100%;
        height: 90vh;
    }
</style>
