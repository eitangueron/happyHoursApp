import React, { Component } from "react";
import LoginModal from "react-login-modal";
// const axios = require('axios').default;


class LogIn extends Component {
    
    saveNewUserInDB = (username, email, password) => {
        // const savedSuccesfully = await axios.post(`server url/:${username}/:${password}/:${email}`)
        // const savedSuccesfully = axios.post('/server url', {username, email, password})
        const savedSuccesfully = true
        return savedSuccesfully
    }

    validateLogInInDB = (username, password) => {
        return true
        // const userExist = await axios.get(`server url/:${username}/:${password}`)
        // return userExist
    }

    handleSignup = async (username, email, password) => {
        await this.saveNewUserInDB(username, email, password)
        const savedSuccesfully = true
        if(!savedSuccesfully){ 
            alert('we had an error, please try again')
        } else {
            this.props.saveUserInfoToSessionStorage({username})
            // alert('Great success')
        }
    };

    handleLogin = async (username, password) => {
        // const userExist = await this.validateLogInInDB(username, password)
        const userExist = true
        if(!userExist){
            alert('Wrong info try again')
        } else {
            this.props.saveUserInfoToSessionStorage({username})
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
