import { Switch, Route } from 'react-router';
import './App.css';
import FetchUser from './components/FetchUser';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';

function App() {
  return (
    <div className="App">
      <NavBar />
      <FetchUser>
        <Switch>
          <Route exact path='/' component={LoginRegister} />
          <ProtectedRoute exact path='/home' component={Home} />
        </Switch>
      </FetchUser>
    </div>
  );
}

export default App;
