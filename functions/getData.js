const getData = async (URL) => {
  let data = null;
  await fetch(URL)
    .then((res) => res.json())
    .then((res) => (data = res));
  return data;
};
export default getData;
