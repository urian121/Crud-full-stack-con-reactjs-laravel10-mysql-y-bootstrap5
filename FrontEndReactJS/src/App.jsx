import "./styles/App.css";
import HomePage from "./components/HomePage";
import Titulo from "./components/Titulo";

function App() {
  return (
    <>
      <div className="row justify-content-md-center">
        <div className="col-md-12">
          <Titulo />
        </div>
      </div>
      <HomePage />
    </>
  );
}

export default App;
