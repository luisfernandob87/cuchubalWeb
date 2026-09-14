import Footer from "./inicio/Footer";
import Principal from "./invite/Principal";
import MenuInicio from "./inicio/MenuInicio";

function Invite() {
  return (
    <div className="principal-container">
      <MenuInicio />
      <Principal />
      <Footer />
    </div>
  );
}

export default Invite;