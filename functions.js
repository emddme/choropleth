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
    k.properties.higherEd = statisticsCollection[i].bachelorsOrHigher;
    k.properties.color = scale(statisticsCollection[i].bachelorsOrHigher);
  });
};

//create SVG
export const createSVG = (width, height, viewBox) => {
  const svg = d3
    .select("#app")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `${viewBox[0]} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}`);
  return svg;
};

//draw geo
export const draw = (target, featuresCollection, collectionName) => {
  const path = d3.geoPath();
  target
    .selectAll(`.${collectionName}`)
    .data(featuresCollection)
    .enter()
    .append("path")
    .classed(collectionName, true)
    .attr("id", (d) => d.id)
    .attr("fips", (d) => d.properties.fips)
    .attr("state", (d) => d.properties.state)
    .attr("county", (d) => d.properties.county)
    .attr("higherEd", (d) => d.properties.higherEd)
    .attr("d", path)
    .style("fill", (d) => d.properties.color);
};
