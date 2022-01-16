import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Pokemons from "./Components/Home/Pokemons";
import createPokemon from "./Components/CreatePokemon/createPokemon";
import Card from "./Components/Card/Pokemon";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Pokemons} />
          <Route exact path="/pokemon" component={createPokemon} />
          <Route path="/pokemon/:id" component={Card} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
