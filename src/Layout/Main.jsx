import { Outlet, useLocation } from "react-router-dom";

import Footer from "../component/Shared/Footer/Footer";
import Header from "../component/Shared/Header/Header";

const Main = () => {
  const location = useLocation(); // Get the current location from react-router-dom

  // Check if the current path includes "login" or "signup" to determine whether to show the header and footer
  const withoutHeaderAndFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <div>
      {/* Conditionally render the NavBar component if withoutHeaderAndFooter is false */}
      {withoutHeaderAndFooter || <Header></Header>}
      <Outlet></Outlet> {/* Render the child components */}
      {/* Conditionally render the Footer component if withoutHeaderAndFooter is false */}
      {withoutHeaderAndFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
