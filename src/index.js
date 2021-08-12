import { Viewer, GridImageryProvider, Ion } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./css/main.css";
import MVTImageryProvider from "../src/MVTImageryProvider";

Ion.defaultServer = ""

var cesiumViewer = new Viewer("cesiumContainer", {
  terrainProvider: undefined,
  imageryProvider: new GridImageryProvider()
});

var style = {
  version: 8,
  sources: {
    countries: {
      type: "vector",
      tiles: [
        "https://cartocdn-gusc-a.global.ssl.fastly.net/cartosupport/api/v1/map/cartosupport@ecb18407@24faa682b57279a4617fb475597372a5:1622918835470/{z}/{x}/{y}.mvt",
      ],
      maxzoom: 6,
    },
  },
  layers: [
    {
      id: "area-white",
      type: "fill",
      source: "countries",
      "source-layer": "layer0",
      paint: {
        "fill-color": "#F0F8FF",
      },
    },

  ],
};

const provider = new MVTImageryProvider({
  style,
  cesiumViewer,
});
provider.readyPromise.then(() => {
  cesiumViewer.imageryLayers.addImageryProvider(provider);
});
