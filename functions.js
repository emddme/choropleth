//get static data (local)
export const getStatic = async (URL) => {
  let data = null;
  await fetch(URL)
  .then((res) => res.json())
  .then((res) => data = res);
  return data;
}

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

//create SVG
export const createSVG = (width, height, viewBox) => {
  const svg = d3
  .select("#app")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", `${viewBox[0]} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}`);
  return svg
}

//draw geo
export const draw = (target, featuresCollection, collectionName) => {
  const path = d3.geoPath();
  target
  .selectAll(`.${collectionName}`)
  .data(featuresCollection)
  .enter()
  .append("path")
  .classed(collectionName, true)
  .attr("d", path)
}