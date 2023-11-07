import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Users from './Components/Users'; 
import CreateUsers from './Components/CreateUsers'; 
import EditUsers from './Components/EditUsers';

function App() {
  return (
    <div className="container">
      <div className="App"> 

        <BrowserRouter> 

          <Routes>
            <Route index element={<Users/>} />
            <Route path="user/create" element={<CreateUsers/>} /> 
            <Route path="user/:id/edit/" element={<EditUsers/>} />
          </Routes>
        </BrowserRouter>
      </div>
      
    </div>
  );
}

export default App;
