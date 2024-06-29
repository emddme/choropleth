const createSVG = (viewBox, id) => {
  const svg = d3
    .select("#app")
    .append("svg")
    .attr("id", id)
    .attr("viewBox", viewBox);
  return svg;
};
export default createSVG;
