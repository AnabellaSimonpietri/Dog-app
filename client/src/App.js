import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DogsCreate from "./components/DogsCreate";
import Home from "./components/Home";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/dogs" component={DogsCreate} />
          <Route path="/home" component={Home} />
          <Route path="/detail/:idRaza" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
