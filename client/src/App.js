// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
// import ProjectList from './components/ProjectList';
// import CreateProject from './components/CreateProject';

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <main className="container mx-auto px-4">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/projects" element={<ProjectList />} />
//             <Route path="/projects/create" element={<CreateProject />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CitizenDashboard from './components/CitizenDashboard';
import ScientistDashboard from './components/ScientistDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
          <Route path="/scientist-dashboard" element={<ScientistDashboard />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
