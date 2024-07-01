const drawCounties = (target, featuresCollection) => {
  const path = d3.geoPath();
  d3.select(target)
    .selectAll(".county")
    .data(featuresCollection)
    .enter()
    .append("path")
    .classed("county", true)
    .attr("d", path)
    .attr("id", (d) => `id_${d.id}`)
    .attr("data-fips", (d) => d.properties.fips)
    .attr("state", (d) => d.properties.state)
    .attr("county", (d) => d.properties.county)
    .attr("data-education", (d) => d.properties.bachelorsOrHigher)
    .style("fill", (d) => d.properties.color);
};
export default drawCounties;
