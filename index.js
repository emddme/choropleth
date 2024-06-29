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
  tooltipWidth,
  tooltipHeight,
  tooltipOffsetX,
  tooltipOffsetY,
} from "./variables.js";
import colorScale from "./functions/colorScale.js";
import combine from "./functions/combine.js";
import convert from "./functions/convert.js";
import createSVG from "./functions/createSVG.js";
import drawCounties from "./functions/drawCounties.js";
import drawLegend from "./functions/drawLegend.js";
import drawNation from "./functions/drawNation.js";
import drawStates from "./functions/drawStates.js";
import drawTooltip from "./functions/drawTooltip.js";
import fetchData from "./functions/fetchData.js";
import getStatic from "./functions/getStatic.js";
import insertTitleDescription from "./functions/insertTitleDescription.js";
import removeTooltip from "./functions/removeTooltip.js";

//get data
const topoStatic = await getStatic(topoURL_static);
const eduStatic = await getStatic(educationURL_static);

//convert topology data to features collection
const nation = convert(topoStatic, "nation");
const states = convert(topoStatic, "states");
const counties = convert(topoStatic, "counties").sort((a, b) => a.id - b.id);

//define colorScale
const scale = colorScale(eduStatic);

//add education data to "counties" features collection, incl. scaled color and mean coordinate
combine(counties, eduStatic, scale);

//insert title and description
insertTitleDescription("#app", title, description);

//create svg and draw geometries
const svg = createSVG(viewBox, "map");
drawNation("#map", nation);
drawStates("#map", states);
drawCounties("#map", counties);

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

//mouse-event tooltip insertion
d3.selectAll(".county").on("mouseover", (e) =>
  drawTooltip(e, tooltipWidth, tooltipHeight)
);

//mouse-event tooltip removal
d3.selectAll(".county").on("mouseout", (e) => removeTooltip(e));
