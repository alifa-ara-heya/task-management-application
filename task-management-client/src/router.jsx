import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Home/Login/Login";
import PrivateRoute from "./PrivateRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><Home /></PrivateRoute>
    }, {
        path: '/login',
        element: <Login />
    }
]);

export default router;