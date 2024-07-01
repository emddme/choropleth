const highlight = (e) => {
  const id = e.target.id;
  const highlightColor = "white";
  d3.select(`#${id}`).style("fill", highlightColor);
};
export default highlight;
