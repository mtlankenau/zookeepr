const fs = require('fs');
const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers');
jest.mock('fs');

test('creates a zookeeper object', () => {
  const zookeeper = createNewZookeeper({ name: 'Mike', id: '1234567890'}, zookeepers);

  expect(zookeeper.name).toBe('Mike');
  expect(zookeeper.id).toBe('1234567890');
});

test('filters by query', () => {
  const startingZookeepers = [
    {
      "id": "4",
      "name": "Ryan",
      "age": 20,
      "favoriteAnimal": "dog"
    },
    {
      "id": "5",
      "name": "Alex",
      "age": 32,
      "favoriteAnimal": "Sloths"
    },
  ];

  const updatedZookeepers = filterByQuery({ favoriteAnimal: 'dog' }, startingZookeepers);

  expect(updatedZookeepers.length).toEqual(1);
});

test('finds zookeeper by their ID', () => {
  const startingZookeepers = [
    {
      "id": "4",
      "name": "Ryan",
      "age": 20,
      "favoriteAnimal": "dog"
    },
    {
      "id": "5",
      "name": "Alex",
      "age": 32,
      "favoriteAnimal": "Sloths"
    },
  ]

  const updatedZookeepers = findById('5', startingZookeepers);

  expect(updatedZookeepers.name).toBe('Alex');
})

test('validates favorite animal', () => {
  const zookeeper = {
    "id": "4",
    "name": "Ryan",
    "age": 20,
    "favoriteAnimal": "dog"
  };

  const invalidZookeeper = {
    "id": "5",
    "name": "Alex",
    "age": 32,
  };

  const validatedZookeeper = validateZookeeper(zookeeper);
  const invalidatedZookeeper = validateZookeeper(invalidZookeeper);

  expect(validatedZookeeper).toEqual(true);
  expect(invalidatedZookeeper).toEqual(false);
});