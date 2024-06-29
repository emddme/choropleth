const drawLegend = (
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
export default drawLegend;
