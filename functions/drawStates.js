const drawStates = (target, featuresCollection) => {
  const path = d3.geoPath();
  d3.select(target)
    .selectAll(".state")
    .data(featuresCollection)
    .enter()
    .append("path")
    .classed("state", true)
    .attr("d", path)
    .attr("id", (d) => `id_${d.id}`);
};
export default drawStates;
