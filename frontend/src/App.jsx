import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/Home"
import Signup from "./components/auth/Signup";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
 

]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />

    </>
  );
}

export default App;
