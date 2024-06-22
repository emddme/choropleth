import {getStatic, fetchData, createSVG, draw} from "./functions.js"
import {topoURL_static, educationURL_static, topoURL, educationURL, svgWidth, svgHeight} from "./variables.js"

//get data
const topoStatic = await getStatic(topoURL_static);
const eduStatic = await getStatic(educationURL_static);

//convert data to features
const nation = topojson.feature(topoStatic, topoStatic.objects.nation).features;
const states = topojson.feature(topoStatic, topoStatic.objects.states).features;
const counties = topojson.feature(
  topoStatic,
  topoStatic.objects.counties
).features;

//create svg and draw geometries
const svg = createSVG(svgWidth, svgHeight, topoStatic.bbox);
draw(svg, nation, "nation");
draw(svg, states, "state")
draw(svg, counties, "county");