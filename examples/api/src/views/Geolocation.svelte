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
    height: 400px;
    border-radius: 14px;
  }
</style>
