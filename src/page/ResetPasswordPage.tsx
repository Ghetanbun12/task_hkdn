import React from "react";
import LoginImageTwo from "../components/Login/LoginImageTwo";
// import "../../style/Login/ResetPassword.css";
import ConfirmPassword from "../components/Login/ConfirmPassword";
import ResetPassword from "../components/Login/ResetPassowrd";
const ResetPasswordPage = () => {
    return(
        
        <div className="login-container">
            <div className="resetpassword-form">
                {/* <ResetPassword/> */}
            </div>
            <div className="login-image">
                <LoginImageTwo/>
            </div>
        </div>
    );
}
export default ResetPasswordPage;