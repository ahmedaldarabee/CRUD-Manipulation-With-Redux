import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {register} from "../store/authSlice"

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const registerUser = () => {
    dispatch(register());
  }

  return (
    <div className="header">
      <h1>Crud Web <span className="main-color">Application</span></h1>
      <ul className="nav">
        <li>
        {/* end: to toggle between links when be as active */}
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li>
          <NavLink to="post/add">Add Post</NavLink>
        </li>
        <li className="login pointer" onClick={registerUser}> {`${isLoggedIn ? 'Log-out' : 'Log-In'}`} </li>
      </ul>
    </div>
  );
};

export default Header;
