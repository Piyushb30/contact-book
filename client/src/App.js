import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <h1>CRUD Application</h1> */}
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/addContact' element={<AddEdit />}/>
          <Route exact path='/update/:id' element={<AddEdit />}/>
          <Route exact path='/view/:id' element={<View />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
