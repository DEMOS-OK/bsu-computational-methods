import SolverInterface from "./SolverInterface.tsx";
import MatrixSizeError from "./errors/MatrixSizeError.tsx";
import NonSquareMatrixError from "./errors/NonSquareMatrixError.tsx";

class SimpleIterationSolver implements SolverInterface {
  solve(matrix: number[][], rows: number, cols: number, freeMembers: number[]): number[] {
    if (rows < 2 || cols < 2) {
      throw new MatrixSizeError('Матрица должна быть размером больше чем 1x1');
    }

    if (rows !== cols) {
      throw new NonSquareMatrixError('Матрица должна быть квадратной');
    }

    let solution: number[] = Array(rows).fill(0);
    let nextSolution: number[] = Array(rows).fill(0);
    let error = 1, epsilon = 1e-5;

    while (error > epsilon) {
      for (let i = 0; i < rows; i++) {
        let sum = 0;
        for (let j = 0; j < cols; j++) {
          if (i !== j) {
            sum += matrix[i][j] * solution[j];
          }
        }
        nextSolution[i] = (freeMembers[i] - sum) / matrix[i][i];
      }

      error = Math.max(...solution.map((x, idx) => Math.abs(x - nextSolution[idx])));
      solution = [...nextSolution];
    }

    return solution;
  }
}

export default SimpleIterationSolver;
