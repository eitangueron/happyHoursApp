import React, { Component } from "react";
import LoginModal from "react-login-modal";


class LogIn extends Component {

    
saveNewUserInDB = (username, email, password) => {
   return null 
}

validateLogInInDB = (username, password) => {
    return true
 }

handleSignup = (username, email, password) => {
    this.saveNewUserInDB()
    sessionStorage.setItem('happyHoursCache', JSON.stringify({
        username,
        email,
        password
    }))
};

handleLogin = async (username, password) => {
    const userInfo = await this.validateLogInInDB(username, password)
    if(!userInfo){
        alert('Wrong info try again')
    } else {
        sessionStorage.setItem('happyHoursCache', JSON.stringify(userInfo))
        
    }
}

  render() {
    return (
      <>
        <LoginModal
            handleSignup={this.handleSignup}
            handleLogin={this.handleLogin}
            buttonColor={"#52AE64"}
            disabledButtonColor={"#C7E4CD"}
            buttonHoverColor={"#A7D5B0"}
            fontFamily={"roboto"}
            errorMessage={"Incorrect username or password"}
            errorEnable={false} />
        </>
    );
  }
}

export default LogIn
