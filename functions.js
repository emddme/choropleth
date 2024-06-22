//get static data (local)
export const getStatic = async (URL) => {
  const data = null;
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

//draw geo
export const draw = (featuresCollection, collectionName) => {
  const path = d3.geoPath();
  d3
  .selectAll(`.${collectionName}`)
  .data(featuresCollection)
  .enter()
  .append("path")
  .classed(collectionName, true)
  .attr("d", path)
}