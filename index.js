import * as v from "./variables.js";
import * as f from "./functions.js";

//get static data
const eduStatic = await fetch(v.educationURL_static)
  .then((res) => res.json())
  .then((res) => res);

const topoStatic = await fetch(v.topoURL_static)
  .then((res) => res.json())
  .then((res) => res);

//create path
const path = d3.geoPath();

//convert to features
const nation = topojson.feature(topoStatic, topoStatic.objects.nation).features;

const counties = topojson.feature(
  topoStatic,
  topoStatic.objects.counties
).features;

const bb = topoStatic.bbox;

//create SVG
const svg = d3
  .select("#app")
  .append("svg")
  .attr("width", v.width)
  .attr("height", v.height)
  .attr("viewBox", `${bb[0]} ${bb[1]} ${bb[2]} ${bb[3]}`);

svg
  .selectAll(".nation")
  .data(nation)
  .enter()
  .append("path")
  .classed("nation", true)
  .attr("d", path);

console.log(eduStatic);
console.log(topoStatic);
console.log(counties);
console.log(path);
