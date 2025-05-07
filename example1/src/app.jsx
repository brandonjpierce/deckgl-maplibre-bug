import "maplibre-gl/dist/maplibre-gl.css";
import "../../shared/reset.css";
import { useEffect } from "react";
import { Deckgl, useDeckgl } from "@deckgl-fiber-renderer/dom";
// import { COORDINATE_SYSTEM } from "@deck.gl/core";
// import { SphereGeometry } from "@luma.gl/engine";
import { Map as Maplibre } from "maplibre-gl";
import { FILL, STROKE } from "../../shared/colors";
import { DATA_URL } from "../../shared/data";
import { INITIAL_VIEW_STATE, STYLE } from "../../shared/map";

// const EARTH_RADIUS_METERS = 6378137.0;

// const bgGeometry = new SphereGeometry({
//   radius: EARTH_RADIUS_METERS,
//   nlat: 360,
//   nlong: 360,
// });

const parameters = {
  // This does seem to work but results in geometry not being backface culled correctly
  depthCompare: "always",
};

export function App() {
  const deckglInstance = useDeckgl();

  useEffect(() => {
    if (deckglInstance) {
      const maplibre = new Maplibre({
        container: "maplibre",
        style: STYLE,
        center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
        zoom: INITIAL_VIEW_STATE.zoom,
        dragRotate: false,
        maxPitch: 0,
      });

      maplibre.once("style.load", () => {
        maplibre.setProjection({ type: "globe" });
        maplibre.addControl(deckglInstance);
      });

      return () => {
        maplibre.remove();
      };
    }
  }, [deckglInstance]);

  return (
    <>
      <div id="maplibre" />
      <Deckgl parameters={parameters} interleaved>
        {/* <simpleMeshLayer
          id="background"
          data={[0]}
          mesh={bgGeometry}
          coordinateSystem={COORDINATE_SYSTEM.CARTESIAN}
          getPosition={[0, 0, 0]}
          getColor={[255, 255, 255]}
        /> */}
        <geoJsonLayer
          id="polygon"
          data={DATA_URL}
          getFillColor={FILL}
          getLineColor={STROKE}
          filled={false}
          stroked={true}
          getLineWidth={2}
          lineWidthUnits="pixels"
          // getPolygonOffset={() => [0, -999]}
          // parameters={{ cullMode: "back" }}
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
          // billboard={false}

          // cullMode of "back" makes text disappear
          parameters={{ cullMode: "front" }}
        />
      </Deckgl>
    </>
  );
}
