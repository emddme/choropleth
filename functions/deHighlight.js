const deHighlight = (e) => {
  d3.select(`#${e.target.id}`).style(
    "fill",
    e.target.__data__.properties.color
  );
};
export default deHighlight;
