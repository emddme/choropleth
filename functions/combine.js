const combine = (featuresCollection, statisticsCollection, scale) => {
  const coordinateList = featuresCollection.map((k) => {
    if (k.geometry.coordinates[0].length === 1) {
      return k.geometry.coordinates[0][0];
    } else {
      return k.geometry.coordinates[0];
    }
  });
  const meanX = coordinateList
    .map((k) => k.map((j) => j[0]))
    .map((k) => (d3.min(k) + d3.max(k)) / 2);
  const meanY = coordinateList
    .map((k) => k.map((j) => j[1]))
    .map((k) => (d3.min(k) + d3.max(k)) / 2);
  const meanXY = meanX.map((k, i) => [k, meanY[i]]);

  featuresCollection.map((k, i) => {
    k.properties.meanXY = meanXY[i];
    k.properties.fips = statisticsCollection[i].fips;
    k.properties.state = statisticsCollection[i].state;
    k.properties.county = statisticsCollection[i].area_name;
    k.properties.bachelorsOrHigher = statisticsCollection[i].bachelorsOrHigher;
    k.properties.color = scale(statisticsCollection[i].bachelorsOrHigher);
  });
};
export default combine;
