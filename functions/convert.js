const convert = (topologyObject, geocollectionObject) => {
  const result = topojson.feature(
    topologyObject,
    topologyObject.objects[geocollectionObject]
  ).features;
  return result;
};
export default convert;
