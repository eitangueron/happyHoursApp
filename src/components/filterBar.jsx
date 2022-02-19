import React, { Component} from 'react';

export default class FilterBar extends Component {

  constructor(props) {
    super(props);
    this.appliedFilters = this.props.appliedFilters
  }

  render() {
    return (
       <div style={{ 
           height:'10vh',
           width:'100vw',
           display:'grid',
           gridTemplateRows:'1fr 2fr',
           }}>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
                <span >Filter by:</span>
                <button style={{width:'20vw', justifySelf:'end'}} 
                onClick={() => this.props.setAppliedFilters({ time:null, radius:Infinity, placeType: null, name:"" })}>
                Clear
                </button>
            </div>

            <div style={{ 
            display:'grid',
            gridTemplateColumns:'1fr 1fr 1fr',
            }}>
                
                <select id="placeTypeFilter" 
                onChange={ () => this.props.setAppliedFilters({ ...this.props.appliedFilter, placeType:document.getElementById("placeTypeFilter").value }) }
                >
                    <option value="">Place Type</option>
                    <option value="bar">Bar</option>
                    <option value="resturant">Resturant</option>
                    <option value="coffeeHouse">Coffee House</option>
                </select>

                <input placeholder='Radius' type="number" id="radiusFilter'" min="0" max="5000" 
                onChange={ () => this.props.setAppliedFilters({ ...this.props.appliedFilter, radius:document.getElementById("radiusFilter").value }) }
                />
                
                <input type="time" id="timeFilter"
                onChange={ () => this.props.setAppliedFilters({ ...this.props.appliedFilter, time:document.getElementById("timeFilter").value }) }
                />
            
            </div>
        </div>
    );
  }
}