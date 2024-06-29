const fetchData = (URL) => {
  console.log("fetching...");
  const req = new XMLHttpRequest();
  req.open("GET", URL, true);
  req.onload = () => {
    return JSON.parse(req.response);
  };
  req.send(null);
};
export default fetchData;
