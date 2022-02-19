import React, { Component } from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from './components/logIn';
import Map from './components/map';
import FilterBar from './components/filterBar'

const SESSION_STORAGE_NAME = "happyHoursCache"


class App extends Component {

  constructor(props){
    super(props)
    this.userInfo = this.getUserInfoFromCache()
    this.state = {
      isLoggenIn : this.userInfo ? true : false,
      appliedFilter : {
        time:null,
        radius:Infinity,
        placeType: null,
      }
    }
  }

  setAppliedFilters(newFilters){
    this.setState({ appliedFilter : newFilters })
  }

  getUserInfoFromCache = () => {
    return JSON.parse( sessionStorage.getItem(SESSION_STORAGE_NAME) )
  }

  saveUserInfoToSessionStorage (userInfo) {
    sessionStorage.setItem(SESSION_STORAGE_NAME, JSON.stringify(userInfo))
    this.setState({isLoggenIn : true})
  }

  // getUserLocation () {
  //   return navigator.geolocation.getCurrentPosition((position) => {
  //       return {lat : position.coords.latitude, lng: position.coords.longitude }
  //       })
  //   }

  render() {
    return (
      !this.state.isLoggenIn ? 
      <LogIn saveUserInfoToSessionStorage={(userInfo) => this.saveUserInfoToSessionStorage(userInfo)}/> 
      :
      <div style={{display:'grid', height:'100vh', width:'100vw', }}>
        <FilterBar setAppliedFilters={(newFilters) => this.setAppliedFilters(newFilters)} appliedFilter={this.state.appliedFilter}></FilterBar>
        <Map style={{ height:'90vh', width:'100vw', }} appliedFilter={this.state.appliedFilter}/>
      </div>
    );
  }
}

export default App;
