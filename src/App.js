import { Login } from "./login";
import { Registration } from "./studentregistration";
import { Teacheregistration } from "./teacherregistration";
import { Student } from "./studentportal";
import { TeacherPortal } from "./teachersportal";
import { Provider } from "react-redux";
import { rootReducer } from "./reducer/index";
import { createContext } from "react";
import { createStore } from "redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export const store = createStore(rootReducer);
export const Allcontext = createContext();
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/studentregistration" element={<Registration />} />
            <Route
              path="/teacheregistration"
              element={<Teacheregistration />}
            />
            <Route path="/studentportal" element={<Student />} />
            <Route path="/teacherportal" element={<TeacherPortal />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
