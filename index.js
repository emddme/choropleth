import {
  getStatic,
  fetchData,
  convert,
  combine,
  insertTitleDescription,
  createSVG,
  drawMap,
  colorScale,
} from "./functions.js";
import {
  topoURL_static,
  educationURL_static,
  topoURL,
  educationURL,
  title,
  description,
  viewBox,
} from "./variables.js";

//get data
const topoStatic = await getStatic(topoURL_static);
const eduStatic = await getStatic(educationURL_static);

//convert topology data to features collection
const nation = convert(topoStatic, "nation");
const states = convert(topoStatic, "states");
const counties = convert(topoStatic, "counties").sort((a, b) => a.id - b.id);

//define colorScale
const scale = colorScale(eduStatic);

//add education data to "counties" features collection, incl. scaled color
combine(counties, eduStatic, scale);

//insert title and description
insertTitleDescription("#app", title, description);

//create svg and draw geometries
const svg = createSVG(viewBox);
drawMap(svg, nation, "nation");
drawMap(svg, states, "state");
drawMap(svg, counties, "county");
