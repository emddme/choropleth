import {
  getStatic,
  fetchData,
  convert,
  combine,
  createSVG,
  draw,
} from "./functions.js";
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

//convert topology data to features collection
const nation = convert(topoStatic, "nation");
const states = convert(topoStatic, "states");
const counties = convert(topoStatic, "counties").sort((a, b) => a.id - b.id);

//define colorScale
const scale = d3
  .scaleSequential()
  .domain(d3.extent(eduStatic.map((k) => k.bachelorsOrHigher)))
  .interpolator(d3.interpolateCool);

//add education data to "counties" features collection, incl. scaled color
combine(counties, eduStatic, scale);

//create svg and draw geometries
const svg = createSVG(svgWidth, svgHeight, topoStatic.bbox);
draw(svg, nation, "nation");
draw(svg, states, "state");
draw(svg, counties, "county");
