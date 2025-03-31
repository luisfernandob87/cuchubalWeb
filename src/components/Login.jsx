import React from "react";
import Footer from "./inicio/Footer";
import Principal from "./login/Principal";
import MenuInicio from "./inicio/MenuInicio";

const Login = () => {
  return (
    <div className="principal-container">
    <div className="containerLogin">
    <MenuInicio />
      <Principal />
      <Footer />
    </div>
    </div>
  );
};

export default Login;
