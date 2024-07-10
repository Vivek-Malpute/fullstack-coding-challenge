import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AmbulanceForm from "./components/AmbulanceForm";

function App() {
  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="app" style={{padding:"1rem"}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/ambulances"
            element={<AmbulanceForm onSubmit={handleFormSubmit} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
