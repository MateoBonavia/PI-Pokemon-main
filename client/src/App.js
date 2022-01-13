import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Pokemons from "./Components/Home/Pokemons";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/home" component={Pokemons} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
