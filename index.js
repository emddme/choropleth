import { getStatic, fetchData, createSVG, draw } from "./functions.js";
import {
  topoURL_static,
  educationURL_static,
  topoURL,
  educationURL,
  svgWidth,
  svgHeight,
} from "./variables.js";

//get data
const topoStatic = await getStatic(topoURL_static);
const eduStatic = await getStatic(educationURL_static);

//convert data to features
const nation = topojson.feature(topoStatic, topoStatic.objects.nation).features;
const states = topojson.feature(topoStatic, topoStatic.objects.states).features;
const counties = topojson
  .feature(topoStatic, topoStatic.objects.counties)
  .features.sort((a, b) => a.id - b.id);

//add education data to counties
const combinedData = counties.map((k, i) => {
  k.properties.fips = eduStatic[i].fips;
  k.properties.state = eduStatic[i].state;
  k.properties.county = eduStatic[i].area_name;
  k.properties.higherEd = eduStatic[i].bachelorsOrHigher;
});

//create svg and draw geometries
const svg = createSVG(svgWidth, svgHeight, topoStatic.bbox);
draw(svg, nation, "nation");
draw(svg, states, "state");
draw(svg, counties, "county");

console.log(counties);
