<script>
  import { MapLibre, DefaultMarker } from "svelte-maplibre";

  // Alexander platz, berlin
  let marker = {
    lon: 13.413244,
    lat: 52.521992,
  };
</script>

<MapLibre
  center={[13.413244, 52.521992]}
  zoom={14}
  class="map"
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  interactive={false}
  bearing={190}
>
  ▔ <DefaultMarker lngLat={marker}></DefaultMarker>
</MapLibre>

<style>
  :global(.map) {
    height: 400px;
    border-radius: 14px;
  }
</style>
