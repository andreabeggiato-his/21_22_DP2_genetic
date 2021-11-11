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

function generateRandomSolution(cities) {
  const result = [0];

  for (let i = 0; i < cities.length - 1; i = i + 1) {
    const randomCityIndex = Math.floor(Math.random() * (max - min + 1) + min);
  }

  result.push(0);
  return result;
}

const distanceArray = [
  [0 , 94, 76, 141, 91],
  [94, 0, 156, 231, 64],
  [76, 156, 0, 80, 167],
  [141, 231, 80, 0, 229],
  [91, 64, 167, 229, 0],
];

const cities = ['X', 'A', 'B', 'C', 'D'];
const solution = [0, 2, 1, 4, 3, 0];
const solution1 = [0, 3, 1, 2, 4, 0];

const solutionFitness = calculateFitness(solution, distanceArray);
const solutionFitness1 = calculateFitness(solution1, distanceArray);

console.log(solutionFitness);
console.log(solutionFitness1);