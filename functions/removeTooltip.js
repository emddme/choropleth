const removeTooltip = (e) => {
  d3.select(`#tooltip`).remove();
  d3.selectAll(".tooltipText").remove();
};
export default removeTooltip;
