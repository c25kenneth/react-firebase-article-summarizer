import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Button, Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import PastArticles from "./pages/PastArticles";
import Error from "./pages/Error";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Navbar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<PastArticles />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
