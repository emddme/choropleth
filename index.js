import {getStatic, fetchData, draw} from "./functions"
import {topoURL_static, educationURL_static, topoURL, educationURL, svgWidth, svgHeight} from "./variables"

const topoStatic = await getStatic(topoURL_static);
const eduStatic = await getStatic(educationURL_static);

//get svg borders
const bb = topoStatic.bbox;

//convert data to features
const nation = topojson.feature(topoStatic, topoStatic.objects.nation).features;
const states = topojson.feature(topoStatic, topoStatic.objects.states).features;
const counties = topojson.feature(
  topoStatic,
  topoStatic.objects.counties
).features;


//create SVG
d3
  .select("#app")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("viewBox", `${bb[0]} ${bb[1]} ${bb[2]} ${bb[3]}`);

draw(nation, "nation");
draw(states, "state")
draw(counties, "county");


  console.log(nation);
  console.log(states);
  console.log(counties);