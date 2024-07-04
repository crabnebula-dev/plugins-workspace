<script>
  import { MapLibre, DefaultMarker } from "svelte-maplibre";
  import { watchPosition } from "@tauri-apps/plugin-geolocation";

  // Default location
  // Alexander platz, berlin
  let marker = {
    lon: 13.413244,
    lat: 52.521992,
  };

  // TODO: Stop watching once view exited
  watchPosition(
    {
      enableHighAccuracy: true,
      timeout: 0,
      // TODO: Play around with this field
      maximumAge: 500,
    },
    (e) => {
      if (typeof e === "string") {
        // TODO: Print to console
        alert(e);
      } else {
        var coords = e.coords;
        var lon = coords.longitude;
        var lat = coords.latitude;
        marker.lon = lon;
        marker.lat = lat;
      }
    },
  )
    // TODO: Print to console
    .then((e) => alert(e))
    .catch((e) => alert(e));
</script>

<!-- TODO: Remove MapLibre popup -->
<!-- TODO: Add "Searching you location" loader -->
<MapLibre
  center={marker}
  zoom={14}
  class="map"
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  interactive={false}
  bearing={0}
>
  ▔ <DefaultMarker lngLat={marker}></DefaultMarker>
</MapLibre>

<style>
  :global(.map) {
    /* Make relative to actual size */
    padding: 50%;
    border-radius: 14px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
</style>
