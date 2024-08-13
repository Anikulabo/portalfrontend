import { Login } from "./login";
import { Registration } from "./studentregistration";
import { Teacheregistration } from "./teacherregistration";
import { Student } from "./studentportal";
import Layout from './Layout';
import { TeacherPortal } from "./teachersportal";
import { Provider } from "react-redux";
import Admin from "./admin";
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
        <Layout>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/studentregistration" element={<Registration />} />
            <Route path="/teacheregistration" element={<Teacheregistration />} />
            <Route path="/studentportal" element={<Student />} />
            <Route path="/teacherportal" element={<TeacherPortal />} />
            <Route path="/admindashboard" element={<Admin />} />
          </Routes>
        </div>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
