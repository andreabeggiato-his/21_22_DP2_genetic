function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function calculateFitness(solution, distances) {
  let sum = 0;
  for (let i = 0; i < solution.length - 1; i = i + 1) {
    const rowIndex = solution[i];
    const colIndex = solution[i + 1];
    const currentDistance = distances[rowIndex][colIndex];
    sum = sum + currentDistance;
  }

  return 1 / sum;
}

function isCityInSolution(solution, currentIndex) {
  let found = false;
  for (let i = 0; i < solution.length; i = i + 1) {
    if (solution[i] === currentIndex) {
      found = true;
    }
  }
  return found;
}

function generateRandomSolution(cities) {
  const result = [0];
  const min = 1;
  const max = cities.length - 1;

  while (result.length !== cities.length) {
    const randomCityIndex = getRandomNumber(min, max);
    if (!isCityInSolution(result, randomCityIndex)) {
      result.push(randomCityIndex);
    }
  }

  result.push(0);
  return result;
}

function mutate(solution) {
  const min = 1;
  const max = solution.length - 2;
  const startRandomIndex = getRandomNumber(min, max);
  let endRandomIndex = getRandomNumber(min, max);
  
  while (startRandomIndex === endRandomIndex) {
    endRandomIndex = getRandomNumber(min, max);
  }

  const tmp = solution[endRandomIndex];
  solution[startRandomIndex] = solution[endRandomIndex];
  solution[endRandomIndex] = tmp;
}

module.exports = {
  getRandomNumber,
  calculateFitness,
  isCityInSolution,
  generateRandomSolution,
  mutate,
};
