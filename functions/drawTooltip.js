const drawTooltip = (e) => {
  //tooltip core
  let tooltipX = null;
  let tooltipY = null;
  const tooltipWidth = 200;
  const tooltipHeight = 75;
  const tooltipMargin = 20;
  const meanX = e.target.__data__.properties.meanXY[0];
  const meanY = e.target.__data__.properties.meanXY[1];
  const rx = "0.5%";
  if (meanX > 700) {
    tooltipX = meanX - tooltipWidth - tooltipMargin;
  } else {
    tooltipX = meanX + tooltipMargin;
  }
  if (meanY > 120) {
    tooltipY = meanY - tooltipHeight - tooltipMargin;
  } else {
    tooltipY = meanY + tooltipMargin;
  }

  d3.select("#map")
    .append("rect")
    .attr("id", "tooltip")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", rx)
    .attr("x", tooltipX)
    .attr("y", tooltipY);

  //tooltip content
  const props = e.target.__data__.properties;
  const content = [
    `${props.county}, ${props.state}`,
    `fips code: ${props.fips}`,
    `higher ed: ${props.bachelorsOrHigher} %`,
  ];
  const margin = 10;
  const lineHeight = 22;

  for (let i = 0; i < 3; i++) {
    d3.select("#map")
      .append("text")
      .classed("tooltipText", true)
      .attr("x", margin + tooltipX)
      .attr("y", tooltipY + lineHeight + lineHeight * i)
      .text(content[i])
      .attr("textLength", tooltipWidth - margin * 2);
  }
};

export default drawTooltip;
