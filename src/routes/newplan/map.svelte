<script lang="ts">
  import { onMount } from "svelte";
  import type { MapItem } from "$lib/interfaces/mapitem";

  export let current_mapitems: MapItem[];

  let container: HTMLDivElement;
  let map: google.maps.Map;
  let bounds: google.maps.LatLngBounds;
  let markers: google.maps.Marker[] = [];
  let center = { lat: 23.685, lng: 90.3563 };

  function update_map() {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];
    current_mapitems.forEach((current_mapitem) => {
      let marker = new google.maps.Marker({
        title: current_mapitem.name,
        position: {
          lat: current_mapitem.lat,
          lng: current_mapitem.lng,
        },
        map: map,
        label: {
          text: current_mapitem.name,
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

    // console.log("bounds", bounds);
    if (bounds) {
      markers.forEach((marker) => {
        bounds.extend(marker.getPosition());
      });
    }
    if (map) {
      map.fitBounds(bounds);
    }
  }

  onMount(async () => {
    map = new google.maps.Map(container, {
      center: center,
    });
    bounds = new google.maps.LatLngBounds();
    update_map();
  });

  $: {
    current_mapitems = current_mapitems;
    update_map();
  }
</script>

<div class="full-screen" bind:this={container} />

<style>
  .full-screen {
    width: 100%;
    height: 90vh;
  }
</style>
