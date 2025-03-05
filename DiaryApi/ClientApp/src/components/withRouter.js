import { useLocation, useNavigate, useParams } from "react-router-dom";

export function withRouter(Component) {
    return function (props) {
        let location = useLocation(); // Get location (which contains `state`)
        let navigate = useNavigate(); // Allow navigation
        let params = useParams(); // Get route parameters if needed

        return <Component {...props} location={location} navigate={navigate} params={params} />;
    };
}