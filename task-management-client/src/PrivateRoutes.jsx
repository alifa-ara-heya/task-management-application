import { Navigate, useLocation } from "react-router-dom";


import PropTypes from "prop-types";
import { AuthContext } from "./providers/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />
    }
    if (user) {
        return children;
    }
    return (
        <Navigate to='/login' state={{ from: location }} replace />
    )

};
PrivateRoute.propTypes = {
    children: PropTypes.element
}

export default PrivateRoute;