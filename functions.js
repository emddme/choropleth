//get static data (local)
export const getStatic = async (URL) => {
  let data = null;
  await fetch(URL)
    .then((res) => res.json())
    .then((res) => (data = res));
  return data;
};

//fetch data (external)
export const fetchData = (URL) => {
  console.log("fetching...");
  const req = new XMLHttpRequest();
  req.open("GET", URL, true);
  req.onload = () => {
    return JSON.parse(req.response);
  };
  req.send(null);
};

//convert data to featuresCollection
export const convert = (topologyObject, geocollectionObject) => {
  const result = topojson.feature(
    topologyObject,
    topologyObject.objects[geocollectionObject]
  ).features;
  return result;
};

//combine geofeatures and statistics
export const combine = (featuresCollection, statisticsCollection, scale) => {
  featuresCollection.map((k, i) => {
    k.properties.fips = statisticsCollection[i].fips;
    k.properties.state = statisticsCollection[i].state;
    k.properties.county = statisticsCollection[i].area_name;
    k.properties.bachelorsOrHigher = statisticsCollection[i].bachelorsOrHigher;
    k.properties.color = scale(statisticsCollection[i].bachelorsOrHigher);
  });
};

// define color scale
export const colorScale = (statObject) => {
  const scale = d3
    .scaleSequential()
    .domain(d3.extent(statObject.map((k) => k.bachelorsOrHigher)))
    .interpolator(d3.interpolateViridis);
  return scale;
};

//create SVG
export const createSVG = (viewBox, id) => {
  const svg = d3
    .select("#app")
    .append("svg")
    .attr("id", id)
    .attr("viewBox", viewBox);
  return svg;
};

//insert title and description
export const insertTitleDescription = (target, title, description) => {
  d3.select(target).append("h1").attr("id", "title").text(title);
  d3.select(target).append("h3").attr("id", "description").text(description);
};

//draw legend
export const drawLegend = (
  target,
  legendOffset,
  rectOffset,
  rectSize,
  scale,
  legendValues,
  legendTexts,
  textOffset
) => {
  d3.select(target)
    .append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${legendOffset[0]}, ${legendOffset[1]})`);
  for (let i = 0; i < 8; i++) {
    d3.select("#legend")
      .append("rect")
      .attr("y", rectOffset[1] * i)
      .attr("width", rectSize)
      .attr("height", rectSize)
      .style("fill", scale(legendValues[i]));
  }
  for (let i = 0; i < 8; i++) {
    d3.select("#legend")
      .append("text")
      .attr("x", textOffset[1])
      .attr("y", textOffset[0] + textOffset[2] * i)
      .text(legendTexts[i])
      .style("fill", "black");
  }
};

//draw geo
export const drawMap = (target, featuresCollection, collectionName) => {
  const path = d3.geoPath();
  d3.select(target)
    .selectAll(`.${collectionName}`)
    .data(featuresCollection)
    .enter()
    .append("path")
    .classed(collectionName, true)
    .attr("id", (d) => d.id)
    .attr("data-fips", (d) => d.properties.fips)
    .attr("state", (d) => d.properties.state)
    .attr("county", (d) => d.properties.county)
    .attr("data-education", (d) => d.properties.bachelorsOrHigher)
    .attr("d", path)
    .style("fill", (d) => d.properties.color);
};

//draw, remove tooltip
export const drawTooltip = (e, tooltipWidth, tooltipHeight ) => {
  ßd3.select("#map").append("rect").attr("id", "tooltip").attr("width", tooltipWidth).attr("height", tooltipHeight).attr("x", e.target.clientX + 10).attr("y", e.target.clientY + 10).style("fill", "none").style("stroke", "black")
}
export const removeTooltip = (e) => {
  d3.select(`#${e.target.__data__.id}`).remove();
}