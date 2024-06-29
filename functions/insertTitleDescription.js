const insertTitleDescription = (target, title, description) => {
  d3.select(target).append("h1").attr("id", "title").text(title);
  d3.select(target).append("h3").attr("id", "description").text(description);
};
export default insertTitleDescription;
