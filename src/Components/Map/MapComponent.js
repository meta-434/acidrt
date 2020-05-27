import React, { Component } from 'react';
// import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import GoogleMapReact from 'google-map-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import AcidrtContext from "../../AcidrtContext";

export class MapComponent extends Component {

    static contextType = AcidrtContext;

    state={
        lat: 38.028,
        lng: -78.5635
    }

    onMarkerDragEnd = (coord) => {

        console.log(coord);
        console.log(this.props)
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        console.log('lat ', lat, ' lng ', lng, typeof this.props.updateLatLng);
        this.props.updateLatLng(lat, lng);
        this.setState({lat, lng});

    }

    render() {
        const containerStyle = {position:'relative', display: 'block', width: '50vh', height:'50vh'}

        return(
                <Map
                    containerStyle={containerStyle}
                    style={{width: '100%', height: '100%', display: 'block', position: 'relative', overflowY: 'hidden'}}
                    google={this.props.google}
                    initialCenter={ { lat: 38.028, lng: -78.5635 } }
                    zoom = { 9 }
                >
                    <Marker
                        draggable={true}
                        onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                    />

                </Map>
        );
    }
};
export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_MAPS_KEY),
})(MapComponent);