import React, { Component } from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from './components/logIn';
import Map from './components/map';

const SESSION_STORAGE_NAME = "happyHoursCache"


class App extends Component {

  constructor(props){
    super(props)
    this.userInfo = this.getUserInfoFromCache()
    this.state = {
      isLoggenIn : this.userInfo ? true : false
    }
  }

  getUserInfoFromCache = () => {
    return JSON.parse( sessionStorage.getItem(SESSION_STORAGE_NAME) )
  }

  saveUserInfoToSessionStorage (userInfo) {
    sessionStorage.setItem(SESSION_STORAGE_NAME, JSON.stringify(userInfo))
    this.setState({isLoggenIn : true})
  }

  render() {
    return (
      !this.state.isLoggenIn ? <LogIn saveUserInfoToSessionStorage={(userInfo) => this.saveUserInfoToSessionStorage(userInfo)}/> : <Map />
        // <BrowserRouter>
        //   <Routes>
        //     { !this.isLoggenIn ? <LogIn/> : <Map/>}
        //     {/* <Route path="/" element={<LogIn />} />
        //     <Route path="expenses" element={<Map />} /> */}
        //     {/* <Route path="invoices" element={<Invoices />} /> */}
        //   </Routes>
        // </BrowserRouter>
    );
  }
}

export default App;
