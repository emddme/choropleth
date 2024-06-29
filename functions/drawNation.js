const drawNation = (target, featuresCollection) => {
  const path = d3.geoPath();
  d3.select(target)
    .selectAll(`#nation`)
    .data(featuresCollection)
    .enter()
    .append("path")
    .attr("id", "nation")
    .attr("d", path);
};
export default drawNation;
