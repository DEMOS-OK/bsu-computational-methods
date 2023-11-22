import Header from "../components/Header/Header.tsx";
import MatrixInput from "../components/MatrixInput/MatrixInput.tsx";
import KramerSolver from "../math/KramerSolver.tsx";

export default function FirstLab() {
  return (
    <>
      <Header/>
      <div className="container page-padding">
        <MatrixInput solver={new KramerSolver()}></MatrixInput>
      </div>
    </>
  );
}
