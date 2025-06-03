import "maplibre-gl/dist/maplibre-gl.css";
import "../../shared/reset.css";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { Map as Maplibre, useControl } from "react-map-gl/maplibre";
import {
  GeoJsonLayer,
  IconLayer,
  ScatterplotLayer,
  TextLayer,
} from "@deck.gl/layers";
import { FILL, STROKE } from "../../shared/colors";
import { DATA_URL } from "../../shared/data";
import { INITIAL_VIEW_STATE, STYLE } from "../../shared/map";

const PARAMETERS = {
  // depthCompare: "always",
  // cullMode: "back",
};

function DeckGLOverlay(props) {
  useControl(() => new MapboxOverlay(props));
  return null;
}

export function App() {
  const layers = [
    new GeoJsonLayer({
      id: "polygon",
      data: DATA_URL,
      filled: true,
      stroked: true,
      getFillColor: FILL,
      getLineColor: STROKE,
      lineWidthUnits: "pixels",
      getLineWidth: 2,
    }),
    new IconLayer({
      id: "icon",
      data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json",
      iconAtlas:
        "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
      iconMapping:
        "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json",
      getPosition: (d) => d.coordinates,
      getColor: [255, 140, 0],
      getIcon: (d) => "marker",
      getSize: 32,
      billboard: false,
      sizeUnits: "pixels",
      // parameters: { cullMode: "none" },
    }),
    new TextLayer({
      id: "text",
      data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json",
      getPosition: (d) => d.coordinates,
      getText: (d) => d.name,
      getSize: 16,
      getTextAnchor: "middle",
      getAlignmentBaseline: "center",
      getColor: FILL.slice(0, 3),
      billboard: false,
      // beforeId: 'waterway_label',

      // For some reason text is rendered upside down by default?
      // getAngle: -180,
      // Commenting this out hides the text entirely?
      // parameters: { cullMode: "none" },
    }),
  ];

  console.log(layers);

  return (
    <Maplibre
      reuseMaps
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle={STYLE}
      projection="globe"
      dragRotate={false}
      maxPitch={0}
    >
      <DeckGLOverlay layers={layers} interleaved parameters={PARAMETERS} />
    </Maplibre>
  );
}
