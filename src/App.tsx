import {Route, Routes} from "react-router-dom";
import FirstLab from "./pages/FirstLab.tsx";
import SecondLab from "./pages/SecondLab.tsx";

export default function App() {
  return (
    <Routes>
      <Route path='/' element={FirstLab()}/>
      <Route path='/lab2' element={SecondLab()}/>
    </Routes>
  );
}

