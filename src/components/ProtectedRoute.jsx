import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  const token =
    localStorage.getItem("token");


  // User login nahi hai
  if (
    isLoggedIn !== "true" ||
    !token
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  // User logged in hai
  return children;

}


export default ProtectedRoute;
