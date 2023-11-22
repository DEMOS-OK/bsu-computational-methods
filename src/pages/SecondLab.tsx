import Header from "../components/Header/Header.tsx";
import MatrixInput from "../components/MatrixInput/MatrixInput.tsx";
import SimpleIterationSolver from "../math/SimpleIterationSolver.tsx";

export default function SecondLab() {
  return (
    <>
      <Header/>
      <div className="container page-padding">
        <MatrixInput solver={new SimpleIterationSolver()}/>
      </div>
    </>
  );
}
