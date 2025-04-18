import "maplibre-gl/dist/maplibre-gl.css";
import "../../shared/reset.css";
import { useEffect } from "react";
import { Deckgl, useDeckgl } from "@deckgl-fiber-renderer/dom";
import { Map as Maplibre } from "maplibre-gl";
import { FILL, STROKE } from "../../shared/colors";
import { DATA_URL } from "../../shared/data";
import { INITIAL_VIEW_STATE, STYLE } from "../../shared/map";

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
      <Deckgl interleaved>
        <geoJsonLayer
          id="polygon"
          data={DATA_URL}
          getFillColor={FILL}
          getLineColor={STROKE}
          filled
          stroked
          // beforeId="waterway_label"
          // parameters={{ cullMode: "none" }}
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
          billboard={false}
          // beforeId="waterway_label"

          // For some reason text is rendered upside down by default?
          // getAngle={-180}
          // Commenting this out hides the text entirely?
          parameters={{ cullMode: "none" }}
        />
      </Deckgl>
    </>
  );
}
