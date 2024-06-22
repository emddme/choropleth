import * as v from "./variables.js";

//fetch data
const fetchData = (URL) => {
  console.log("fetching...");
  const req = new XMLHttpRequest();
  req.open("GET", URL, true);
  req.onload = () => {
    return JSON.parse(req.response);
  };
  req.send(null);
};

//create SVG
const createSVG = (...v) => {
  d3.select(IDENT_APP).append(E_SVG).attr(ID, MAP);
  return;
};

export { fetchData, createSVG };
