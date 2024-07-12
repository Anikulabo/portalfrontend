import {Login} from "./login";
import { Registration } from "./studentregistration";
import { Provider } from "react-redux";
import { rootReducer } from "./reducer/index";
import { createStore } from "redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export const store = createStore(rootReducer);
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/studentregistration" element={<Registration />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
