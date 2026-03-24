import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRoles = [] }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);

        if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
            return <Navigate to="/" replace />;
        }

        return children;
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }
}

export default ProtectedRoute;