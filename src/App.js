import DoctorList from 'pages/DoctorList';
import HomePage from 'pages/HomePage';
import PatientList from 'pages/PatientList';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/doctors">Doctores</Link> |{" "}
        <Link to="/patients">Pacientes</Link>
      </div>

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='doctors' element={<DoctorList/>}/>
        <Route path='patients' element={<PatientList/>}/>
      </Routes>
    </Router>
  );
}


