const colorScale = (statObject) => {
  const scale = d3
    .scaleSequential()
    .domain(d3.extent(statObject.map((k) => k.bachelorsOrHigher)))
    .interpolator(d3.interpolateViridis);
  return scale;
};
export default colorScale;
