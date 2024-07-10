import {Login} from "./login";
import { Provider } from "react-redux";
import { rootReducer } from "./reducer/index";
import { createStore } from "redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export const store = createStore(rootReducer);
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Provider store={store}>
                <Login />
              </Provider>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
