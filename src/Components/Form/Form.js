import React, { Component } from 'react';
import Map from "../Map/Map";

export default class Form extends Component {

    state = {
        lat: undefined,
        lng: undefined,
    }

    updateLatLng = (lat, lng) => {
        this.setState({lat, lng});
    }

    render(){
        return(
            <form>
                <label>Form placeholder.</label>]
                <label>Map LAT, LNG</label>
                <input
                    placeholder={
                        (this.state.lat && this.state.lng)
                        ?`${
                            Number.parseFloat(this.state.lat).toPrecision(6)
                            + ', ' +
                            Number.parseFloat(this.state.lng).toPrecision(6)
                        }`
                        : 'move pin to incident location'
                    }
                />
                <Map updateLatLng={this.updateLatLng}/>
            </form>
        );
    }
}