import {Routes,  Route, } from 'react-router-dom';
import Leave from './Pages/Leave';
import Admin from './Pages/Admin';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Leave />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );

};

export default App;
