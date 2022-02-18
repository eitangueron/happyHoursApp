import React, { Component } from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from './components/logIn';
import Map from './components/map';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      userInfo:{}
    }
    this.isLoggenIn = false
    this.getUserInfoFromCache()
  }

  getUserInfoFromCache = () => {
    if (sessionStorage.getItem("happyHoursCache")) {
      this.isLoggenIn = true
      this.setState({
        userInfo : JSON.parse( sessionStorage.getItem("happyHoursCache") )
      })
    }
  }

  saveUserInfoToSessionStorage (userInfo) {
    sessionStorage.setItem('happyHoursCache', JSON.stringify(userInfo))
    this.isLoggenIn = true
  }

  render() {
    return (
      !this.isLoggenIn ? <LogIn/> : <Map saveUserInfoToSessionStorage={this.saveUserInfoToSessionStorage}/>
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
