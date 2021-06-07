import { Switch, Route } from 'react-router';
import './App.css';
import FetchUser from './components/FetchUser';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import About from './pages/About';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <NavBar />
      <FetchUser>
        <Switch>
          <Route exact path='/' component={LoginRegister} />
          <ProtectedRoute exact path='/home' component={Home} />
          <ProtectedRoute exact path='/profile' component={UserProfile} />
          <Route exact path='/about' component={About} />
        </Switch>
      </FetchUser>
    </div>
  );
}

export default App;
