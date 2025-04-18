import "maplibre-gl/dist/maplibre-gl.css";
import "../../shared/reset.css";
import { Map as Maplibre, Layer, Source } from "react-map-gl/maplibre";
import { DATA_URL } from "../../shared/data";
import { INITIAL_VIEW_STATE, STYLE } from "../../shared/map";
import { useEffect, useState } from "react";

const layer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": "rgba(255,255,255,0.25)",
    "fill-outline-color": "rgba(255,0,0,0.25)",
  },
};

export function App() {
  const [data, setData] = useState();

  useEffect(() => {
    async function init() {
      const response = await fetch(DATA_URL);
      const d = await response.json();

      setData(d);
    }

    init();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <Maplibre
      reuseMaps
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle={STYLE}
      projection="globe"
      dragRotate={false}
      maxPitch={0}
    >
      <Source id="my-data" type="geojson" data={data}>
        <Layer {...layer} />
      </Source>
    </Maplibre>
  );
}
