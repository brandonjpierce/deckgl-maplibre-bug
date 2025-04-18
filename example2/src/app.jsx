import "maplibre-gl/dist/maplibre-gl.css";
import "../../shared/reset.css";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { Map as Maplibre, useControl } from "react-map-gl/maplibre";
import { GeoJsonLayer } from "@deck.gl/layers";
import { FILL, STROKE } from "../../shared/colors";
import { DATA_URL } from "../../shared/data";
import { INITIAL_VIEW_STATE, STYLE } from "../../shared/map";

function DeckGLOverlay(props) {
  useControl(() => new MapboxOverlay(props));
  return null;
}

export function App() {
  const layers = [
    new GeoJsonLayer({
      id: "data",
      data: DATA_URL,
      filled: true,
      stroked: true,
      getFillColor: FILL,
      getLineColor: STROKE,
      // parameters: { cullMode: "none" },
      // beforeId: "waterway_label",
    }),
  ];

  return (
    <Maplibre
      reuseMaps
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle={STYLE}
      projection="globe"
      dragRotate={false}
      maxPitch={0}
    >
      <DeckGLOverlay layers={layers} interleaved />
    </Maplibre>
  );
}
