const fs = require('fs');
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../lib/animals');
const { animals } = require('../data/animals.json');
jest.mock('fs');

test('creates an animal object', () => {
  const animal = createNewAnimal(
    { name: 'Darlene', id: '1234567890'},
    animals
  );

  expect(animal.name).toBe('Darlene');
  expect(animal.id).toBe('1234567890');
});

test('filters by query', () => {
  const startingAnimals = [
    {
      "id": "3",
      "name": "Noel",
      "species": "bear",
      "diet": "carnivore",
      "personalityTraits": [
        "impish",
        "sassy",
        "brave"
      ]
    },
    {
      "id": "4",
      "name": "Coco",
      "species": "penguin",
      "diet": "herbivore",
      "personalityTraits": [
        "loving",
        "goofy"
      ]
    }
  ];

  const updatedAnimals = filterByQuery({ personalityTraits: 'loving' }, startingAnimals);

  expect(updatedAnimals.length).toEqual(1);
});

test('finds animal by their ID', () => {
  const startingAnimals = [
    {
      "id": "3",
      "name": "Noel",
      "species": "bear",
      "diet": "carnivore",
      "personalityTraits": [
        "impish",
        "sassy",
        "brave"
      ]
    },
    {
      "id": "4",
      "name": "Coco",
      "species": "penguin",
      "diet": "herbivore",
      "personalityTraits": [
        "loving",
        "goofy"
      ]
    }
  ]

  const updatedAnimals = findById('3', startingAnimals);

  expect(updatedAnimals.species).toBe('bear');
})

test('validates personality traits', () => {
  const animal = {
    "id": "3",
    "name": "Noel",
    "species": "bear",
    "diet": "carnivore",
    "personalityTraits": [
      "impish",
      "sassy",
      "brave"
    ]
  };

  const invalidAnimal = {
    "id": "4",
    "name": "Coco",
    "species": "penguin",
    "diet": "herbivore"
  };

  const validatedAnimal = validateAnimal(animal);
  const invalidatedAnimal = validateAnimal(invalidAnimal);

  expect(validatedAnimal).toEqual(true);
  expect(invalidatedAnimal).toEqual(false);
});