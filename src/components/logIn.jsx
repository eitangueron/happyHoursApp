import React, { Component } from "react";
import LoginModal from "react-login-modal";
const axios = require('axios').default;


class LogIn extends Component {

    saveNewUserInDB = (username, email, password) => {
        // const res = await axios.post(`server url/:${username}/:${password}/:${email}`)
        // const res = axios.post('/server url', {username, email, password})
        const res = true
        if(!res){ 
            alert('we had an error, please try again')
        } else {
            this.props.saveUserInfoToSessionStorage(userInfo)
            alert('Great success')
        }
    }

    validateLogInInDB = (username, password) => {
        return true
        // const res = await axios.get(`server url/:${username}/:${password}`)
        // return res
    }

    handleSignup = (username, email, password) => {
        this.saveNewUserInDB(username, email, password)
    };

    handleLogin = async (username, password) => {
        const userInfo = await this.validateLogInInDB(username, password)
        if(!userInfo){
            alert('Wrong info try again')
        } else {
            this.props.saveUserInfoToSessionStorage(userInfo)
            // sessionStorage.setItem('happyHoursCache', JSON.stringify(userInfo))
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
