import "maplibre-gl/dist/maplibre-gl.css";
import "../../shared/reset.css";
import { Deckgl } from "@deckgl-fiber-renderer/dom";
import { _GlobeView } from "@deck.gl/core";
import { FILL, STROKE } from "../../shared/colors";
import { DATA_URL } from "../../shared/data";
import { INITIAL_VIEW_STATE } from "../../shared/map";

const parameters = {
  depthCompare: "less-equal",
  // depthCompare: "always",
  // cullMode: "back",
};

const view = new _GlobeView({
  id: "main",
  controller: true,
  resolution: 1,
});

export function App() {
  return (
    <>
      <Deckgl
        parameters={parameters}
        initialViewState={INITIAL_VIEW_STATE}
        views={view}
        controller
      >
        <geoJsonLayer
          id="polygon"
          data={DATA_URL}
          getFillColor={FILL}
          getLineColor={STROKE}
          filled={true}
          stroked={true}
          getLineWidth={3}
          lineWidthUnits="pixels"
        />
        <textLayer
          id="text"
          data="https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json"
          getPosition={(d) => d.coordinates}
          getText={(d) => d.name}
          getSize={16}
          getTextAnchor="middle"
          getAlignmentBaseline="center"
          getColor={FILL.slice(0, 3)}
          // Setting billboard will invert text 180 deg
          billboard={false}

          // cullMode of "back" makes text disappear
          // parameters={{ cullMode: "front" }}
        />
      </Deckgl>
    </>
  );
}
