import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
class Map extends Component {

    state={
        lat: 38.028,
        lng: -78.5635
    }

    onMarkerDragEnd = (coord) => {

        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        console.log('lat ', lat, ' lng ', lng);
        this.setState({lat, lng})
        this.props.updateLatLng(lat, lng);
    }

    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter = { { lat: 38.028, lng: -78.5635 } }
                defaultZoom = { 9 }
            >

                    <Marker
                        position={{lat: this.state.lat, lng: this.state.lng}}
                        draggable={true}
                        onDragEnd={(coord) => this.onMarkerDragEnd(coord)}
                    />

            </GoogleMap>
        ));
        return(
            <div>
                <GoogleMapExample
                    containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />
            </div>
        );
    }
};
export default Map;