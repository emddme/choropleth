import {
  getStatic,
  fetchData,
  convert,
  combine,
  insertTitleDescription,
  createSVG,
  drawMap,
  colorScale,
  drawLegend,
  addEvents,
  drawTooltip,
  removeTooltip
} from "./functions.js";
import {
  topoURL_static,
  educationURL_static,
  topoURL,
  educationURL,
  title,
  description,
  viewBox,
  legendOffset,
  rectOffset,
  rectSize,
  legendValues,
  legendTexts,
  textOffset,
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
const svg = createSVG(viewBox, "map");
drawMap("#map", nation, "nation");
drawMap("#map", states, "state");
drawMap("#map", counties, "county");

//insert legend
drawLegend(
  "#map",
  legendOffset,
  rectOffset,
  rectSize,
  scale,
  legendValues,
  legendTexts,
  textOffset
);

//insert events
addEvents("counties", "mouseover", drawTooltip);
addEvents("counties", "mouseout", removeTooltip);