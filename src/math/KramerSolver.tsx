import SolverInterface from './SolverInterface';
import det from "./Determinant";
import MatrixSizeError from "./errors/MatrixSizeError";
import NonSquareMatrixError from "./errors/NonSquareMatrixError";
import ZeroDeterminantError from "./errors/ZeroDeterminantError";

class KrammerSolver implements SolverInterface {
  solve(matrix: number[][], rows: number, cols: number, freeMembers: number[]): number[] {
    if (rows < 2 || cols < 2) {
      throw new MatrixSizeError('Матрица должна быть размером больше чем 1x1');
    }

    if (rows !== cols) {
      throw new NonSquareMatrixError('Матрица должна быть квадратной');
    }

    let copyMatrix = JSON.parse(JSON.stringify(matrix));
    const detA = det(copyMatrix);
    if (detA === 0) {
      throw new ZeroDeterminantError('Определитель матрицы равен 0, решение невозможно');
    }

    const solution: number[] = [];
    for (let i = 0; i < rows; i++) {
      copyMatrix = matrix.slice().map(row => row.slice()); // Обновляем copyMatrix
      for (let j = 0; j < rows; j++) {
        copyMatrix[j][i] = freeMembers[j]; // Заменяем столбец i на правую часть уравнения
      }
      const detX = det(copyMatrix);
      solution.push(detX / detA);
    }

    return solution;
  }
}

export default KrammerSolver;

