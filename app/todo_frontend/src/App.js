import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import LoginPage from "./pages/authentication/Login";
import RegisterPage from "./pages/authentication/Register";
import ResetPassword from "./pages/authentication/ResetPassword";
import ResetPasswordEmail from "./pages/authentication/ResetPasswordEmail";

function App() {
  const { access_token } = useSelector((state) => state.auth);
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/api/login" element={<LoginPage />} />
          <Route index path="/api/todo" element={<Home />} />
          <Route path="/api/register" element={<RegisterPage />} />
          <Route
            index
            element={
              !access_token ? (
                <Navigate to="/api/login" />
              ) : (
                <Navigate to="/api/todo" />
              )
            }
          />
        </Route>
        <Route path="/reset-password-email" element={<ResetPasswordEmail />} />
        <Route
          path="/api/user/reset-password/:id/:token"
          element={<ResetPassword />}
        />
        {/* If none of the urls/paths are match, then it shows this error */}
        <Route path="*" element={<h1>Error 404. Page not found.</h1>} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
