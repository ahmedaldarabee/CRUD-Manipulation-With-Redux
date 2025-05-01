import { useSelector } from "react-redux";

const WithGuard = ({ children }) => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    return isLoggedIn ? children : <p className="text-center"> Please <strong>log-in</strong> to accept add posts!</p>;
};

export default WithGuard;
