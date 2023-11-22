import React, {useEffect, useState} from 'react';
import SolverInterface from "../../math/SolverInterface.tsx";
import errorMessages from "../../math/errors/ErrorMessages.tsx";
import styles from './MatrixInput.module.scss';

interface MatrixInputProps {
  solver: SolverInterface;
}

const MatrixInput: React.FC<MatrixInputProps> = ({solver}) => {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [matrix, setMatrix] = useState<number[][]>([[0, 0], [0, 0]]);
  const [freeMembers, setFreeMembers] = useState<number[]>([0, 0]);
  const [solution, setSolution] = useState<number[]>([]);

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = parseInt(e.target.value);
    setRows(newRows);
    generateMatrix();
  };

  const handleColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCols = parseInt(e.target.value);
    setCols(newCols);
    generateMatrix();
  };

  useEffect(() => generateMatrix(), [rows, cols]);

  const generateMatrix = () => {
    const newMatrix: number[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        row.push(0);
      }
      newMatrix.push(row);
    }
    setMatrix(newMatrix);
  };

  const solveMatrix = () => {
    try {
      const solution: number[] = solver.solve(matrix, rows, cols, freeMembers);
      setSolution(solution);
    } catch (error: any) {
      alert(errorMessages[error.name] || errorMessages.default);
    }
  };

  return (<>
    <div className={styles.matrix_input_header}>
      <div>
        Ряды: <br/>
        <input type="number" value={Number(rows)} onChange={handleRowsChange}
               className={styles.input}/>
      </div>
      <div>
        Строки: <br/>
        <input type="number" value={Number(cols)} onChange={handleColsChange}
               className={styles.input}/>
      </div>
      <button onClick={solveMatrix} className={styles.solve_btn}>
        Решить матрицу
      </button>
    </div>
    <hr/>
    <div className={styles.matrix_container}>
      <div className={styles.matrix}>
        <div>
          {matrix.map((row: number[], rowIndex: number) => (<div key={rowIndex} className={styles.matrix__row}>
            {row.map((_cell: number, colIndex: number) => (
              <div className={styles.matrix__input}>
                <label>x{rowIndex + 1}{colIndex + 1}</label>
                <input
                  key={colIndex}
                  type="text"
                  onChange={(e) => {
                    const newMatrix = [...matrix];
                    newMatrix[rowIndex][colIndex] = parseInt(e.target.value);
                    setMatrix(newMatrix);
                  }}
                  className={styles.input}/></div>))}
          </div>))}
        </div>
        <div className={styles.matrix__free_coeff}>
          {Number(rows) > 0 && [...Array(rows)].map((_, i) => {
            return <div className={styles.input_block}>
              <div>=</div>
              <input
                key={i}
                type="text"
                onChange={(e) => {
                  const newFreeMembers = [...freeMembers];
                  newFreeMembers[i] = parseInt(e.target.value);
                  setFreeMembers(newFreeMembers);
                }}
                className={styles.input}
              />
            </div>;
          })}
        </div>
      </div>
    </div>
    <div className={styles.matrix_container}>
      {solution.length > 0 && (<div className={styles.solutions}>
        Solution: {solution.map((value, index) => <span key={index}>{value} </span>)}
      </div>)}
    </div>
  </>);
};

export default MatrixInput;
