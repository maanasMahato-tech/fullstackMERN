import { Routes, Route } from 'react-router-dom';
import TodoState from './components/context/todostate';
import NavBar from './components/layout/nav';
import Home from './components/pages/home';
import Login from './components/pages/login';
import Signup from './components/pages/signup';

function App() {
  return (
    <TodoState>
      <NavBar />
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/login" exact={true} element={<Login />} />
        <Route path="/signup" exact={true} element={<Signup />} />
      </Routes>
    </TodoState>
  );
}

export default App;
