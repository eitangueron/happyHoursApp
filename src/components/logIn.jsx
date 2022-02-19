import React, { Component } from "react";
import LoginModal from "react-login-modal";
const axios = require('axios').default;


class LogIn extends Component {
    
    constructor(props){
        super(props)
        sessionStorage.setItem('All_LOCATIONS', "[]")
    }

    getAllLocations = async () => {
        try {
            const res = await axios.get(`http://localhost:3030/all_locations`);
            await new Promise( sessionStorage.setItem('All_LOCATIONS', JSON.stringify(res.data)) )
          } catch (error) {
            console.error(error);
          }
    }
        

    saveNewUserInDB = async (username, email, password) => {
        const savedSuccesfully = await axios.get(`http://localhost:3030/signup?username=${username}&password=${password}&email=${email}`)
        return savedSuccesfully
    }

    validateLogInInDB = async (username, password) => {
        try{
            const res = await axios.get(`http://localhost:3030/login?user_name=${username}&password=${password}`)
            return res.data
        } catch (error) {
            console.error(error);
          }
    }

    handleSignup = async (username, email, password) => {
        const savedSuccesfully = await this.saveNewUserInDB(username, email, password)
        if(!savedSuccesfully){ 
            alert('User name all ready taken')
        } else {
            await this.getAllLocations()
            this.props.saveUserInfoToSessionStorage({username})
        }
    };

    handleLogin = async (username, password) => {
        const res = await this.validateLogInInDB(username, password)
        if(!res.usernameExists){
            alert('User name doesn\'t exist, try again')
        } else if(!res.passwordMatches){
            alert('Password incorrect, try again')
        } else {
            await this.getAllLocations()
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
