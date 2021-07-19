import "./App.css";
import { Route, Redirect } from "react-router-dom";
import MainPage from "./components/Page/MainPage";
import LoginService from "./services/login-service";

function App() {
  if (!LoginService.isLoggedIn()) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="App">
      <Route exact path="/:id" component={MainPage} />
    </div>
  );
}

export default App;
