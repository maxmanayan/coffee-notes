import { Switch, Route } from 'react-router';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path='/loginRegister' component={LoginRegister} />
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
