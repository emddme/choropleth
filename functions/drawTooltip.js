const drawTooltip = (e, tooltipWidth, tooltipHeight) => {
  d3.select("#map")
    .append("rect")
    .attr("id", "tooltip")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("x", `${e.target.__data__.properties.meanXY[0]}`)
    .attr("y", `${e.target.__data__.properties.meanXY[1]}`)
    .style("fill", "none")
    .style("stroke", "black");
};
export default drawTooltip;
