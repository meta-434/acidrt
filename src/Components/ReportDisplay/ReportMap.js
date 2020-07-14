import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import AcidrtContext from "../../AcidrtContext";

export class MapComponent extends Component {

    static contextType = AcidrtContext;

    state={

    }


    render() {
        console.log('maaaa', this.props);
        const containerStyle = {position:'relative', display: 'block', width: '50vh', height:'50vh'}
        const { markers } = this.props;
        return(
            <Map
                containerStyle={containerStyle}
                style={{width: '100%', height: '100%', display: 'block', position: 'relative', overflowY: 'hidden'}}
                google={this.props.google}
                initialCenter={ { lat: 38.028, lng: -78.5635 } }
                zoom = { 9 }
            >
                {
                    markers.map((marker, idx) => {
                        console.log('marker at', marker)
                        return (
                            <Marker
                                key={idx}
                                name={`${marker.info}`}
                                position={{ lat: `${marker.lat}`, lng: `${marker.lng}` }}
                            />
                        )
                    })
                }
            </Map>
        );
    }
};
export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_MAPS_KEY),
})(MapComponent);