import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import React from 'react';
import Portfolio from './component/Portfolio';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsernamePage from './component/UserNamePage'; 
import PortfolioForm from './component/portfolioForm/PortfolioForm'; 


function App() {
  
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for entering the username */}
          <Route path="/" element={<UsernamePage />} />
          
          {/* Route for displaying the portfolio with the given username */}
          <Route path="/api/portfolio/:username" element={<Portfolio />} />

          <Route path="/portfolio-form" element={<PortfolioForm />} />
        </Routes>
      </div>
    </Router>
    
  );
}
export default App;
