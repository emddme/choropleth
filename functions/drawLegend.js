const drawLegend = (
  scale,
  legendOffset,
  blockOffset,
  blockSize,
  blockValues,
  blockTexts,
  textOffset
) => {
  d3.select("#map")
    .append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${legendOffset[0]}, ${legendOffset[1]})`);
  for (let i = 0; i < 8; i++) {
    d3.select("#legend")
      .append("rect")
      .attr("y", blockOffset[1] * i)
      .attr("width", blockSize)
      .attr("height", blockSize)
      .style("fill", scale(blockValues[i]));
  }
  for (let i = 0; i < 8; i++) {
    d3.select("#legend")
      .append("text")
      .attr("x", textOffset[1])
      .attr("y", textOffset[0] + textOffset[2] * i)
      .text(blockTexts[i]);
  }
};
export default drawLegend;
