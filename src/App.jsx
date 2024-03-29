import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import Main from "./layout/Main";

// Routes
import Intro from "./components/Intro";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import ExpensesPage from "./pages/ExpensesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Intro />,
        errorElement: <Error />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <Error />,
      },
      {
        path: "dashboard/expenses",
        element: <ExpensesPage />,
        errorElement: <Error />,
      }
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;