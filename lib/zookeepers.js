const fs = require('fs');
const path = require('path');

filterByQuery = (query, zookeepersArray) => {
  let filteredResults = zookeepersArray;

  if (query.age) {
    filteredResults = filteredResults.filter(zookeeper => zookeeper.age === Number(query.age));
  }
  if (query.favoriteAnimal) {
    filteredResults = filteredResults.filter(zookeeper => zookeeper.favoriteAnimal === query.favoriteAnimal);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(zookeeper => zookeeper.name === query.name);
  }
  return filteredResults;
};

findById = (id, zookeepersArray) => {
  const result = zookeepersArray.filter(zookeeper => zookeeper.id === id)[0];
  return result;
};

createNewZookeeper = (body, zookeepersArray) => {
  const zookeeper = body;
  zookeepersArray.push(zookeeper);
  fs.writeFileSync(
    path.join(__dirname, '../data/zookeepers.json'),
    JSON.stringify({ zookeepers: zookeepersArray }, null, 2)
  );
  return zookeeper;
};

validateZookeeper = (zookeeper) => {
  if (!zookeeper.name || typeof zookeeper.name !== 'string') {
    return false;
  }
  if (!zookeeper.age || typeof zookeeper.age !== 'number') {
    return false;
  }
  if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== 'string') {
    return false;
  }
  return true;
}

module.exports = {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper
};