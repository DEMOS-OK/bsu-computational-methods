import SolverInterface from './SolverInterface';
import MatrixSizeError from "./errors/MatrixSizeError";
import NonSquareMatrixError from "./errors/NonSquareMatrixError";

class SimpleIterationSolver implements SolverInterface {
  solve(matrix: number[][], rows: number, cols: number,  freeMembers: number[]): number[] {
    const epsilon = 0.0001;
    const maxIterations = 50;

    if (rows !== cols) {
      throw new NonSquareMatrixError('Матрица должна быть квадратной');
    }

    if (rows !== freeMembers.length) {
      throw new MatrixSizeError('Размеры матрицы и вектора свободных членов не совпадают');
    }

    let x: number[] = new Array(cols).fill(0); // начальное приближение
    let iteration = 0;
    let converged = false;

    while (iteration < maxIterations && !converged) {
      const xNew: number[] = new Array(cols).fill(0);
      for (let i = 0; i < rows; i++) {
        let sum = 0;
        for (let j = 0; j < cols; j++) {
          if (i !== j) {
            sum += matrix[i][j] * x[j];
          }
        }
        xNew[i] = (freeMembers[i] - sum) / matrix[i][i];  // Итерационная формула для получения нового значения x
      }
      converged = true;
      for (let i = 0; i < cols; i++) {
        if (Math.abs(xNew[i] - x[i]) > epsilon) {
          converged = false;  // Проверка на сходимость по заданной погрешности
          break;
        }
      }
      x = xNew;  // Обновление значений x для следующей итерации
      iteration++;
    }

    if (!converged) {
      // Обработка случая, когда метод не сошелся за указанное число итераций
      throw new Error('Метод не сошелся за указанное число итераций');
    }

    return x;  // Возвращение решения
  }
}

export default SimpleIterationSolver;