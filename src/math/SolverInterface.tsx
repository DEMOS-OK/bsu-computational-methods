export default interface SolverInterface {
    solve(matrix: number[][], rows: number, cols: number, freeMembers: number[]): number[];
}
