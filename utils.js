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

  const tmp = solution[startRandomIndex];
  solution[startRandomIndex] = solution[endRandomIndex];
  solution[endRandomIndex] = tmp;
}

function truncate(population) {
  population.pop();
}

function pmx(population) {
  const parent1Index = getRandomNumber(0, population.length - 1);
  let parent2Index = getRandomNumber(0, population.length - 1);
  while (parent1Index === parent2Index) {
    parent2Index = getRandomNumber(0, population.length - 1);
  }
  const parent1 = population[parent1Index];
  const parent2 = population[parent2Index];

  const child = [0];
  for (let i = 1; i < parent1.length - 1; i += 1) {
    child.push('*');
  }
  child.push(0);

  const firstIndex = getRandomNumber(1, parent1.length - 3);
  const secondIndex = getRandomNumber(firstIndex + 1, parent1.length - 2);

  for (let i = firstIndex; i <= secondIndex; i += 1) {
    child[i] = parent1[i];
  }

  let p2Index = 1;
  for (let i = 1; i < firstIndex; i = i + 1) {
    let canditate = parent2[p2Index];
    while (isCityInSolution(child, canditate)) {
      p2Index += 1;
      canditate = parent2[p2Index];
    }
    child[i] = canditate;
  }

  for (let i = secondIndex + 1; i < child.length - 1; i = i + 1) {
    let canditate = parent2[p2Index];
    while (isCityInSolution(child, canditate)) {
      p2Index += 1;
      canditate = parent2[p2Index];
    }
    child[i] = canditate;
  }

  return child;
}

// function ox(population) {
//   const parent1Index = getRandomNumber(0, population.length - 1);
//   let parent2Index = getRandomNumber(0, population.length - 1);
//   while (parent1Index === parent2Index) {
//     parent2Index = getRandomNumber(0, population.length - 1);
//   }
//   const parent1 = population[parent1Index];
//   const parent2 = population[parent2Index];

//   const child = [0];
//   for (let i = 1; i < parent1.length - 1; i += 1) {
//     child.push('*');
//   }
//   child.push(0);

//   const firstIndex = getRandomNumber(1, parent1.length - 3);
//   const secondIndex = getRandomNumber(firstIndex + 1, parent1.length - 2);

//   for (let i = firstIndex; i <= secondIndex; i += 1) {
//     child[i] = parent1[i];
//   }

//   let childIndex = secondIndex + 1;
//   for (let i = childIndex; i < child.length - 1; i += 1) {
//     const candidate = parent2[i];
//     if (!isCityInSolution(child, candidate)) {
//       child[childIndex] = candidate;
//       childIndex += 1;
//     }
//     if (childIndex === child.length - 1) {
//       childIndex = 1;
//     }
//   }

//   let p2Index = 1;
//   for (let i = 1; i < firstIndex; i = i + 1) {
//     let canditate = parent2[p2Index];
//     while (isCityInSolution(child, canditate)) {
//       p2Index += 1;
//       canditate = parent2[p2Index];
//     }
//     child[i] = canditate;
//   }

//   for (let i = secondIndex + 1; i < child.length - 1; i = i + 1) {
//     let canditate = parent2[p2Index];
//     while (isCityInSolution(child, canditate)) {
//       p2Index += 1;
//       canditate = parent2[p2Index];
//     }
//     child[i] = canditate;
//   }

//   return child;
// }

module.exports = {
  getRandomNumber,
  calculateFitness,
  isCityInSolution,
  generateRandomSolution,
  mutate,

  pmx,

  truncate,
};
