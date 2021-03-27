import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    position: 'relative',
    width: '100%',
    height: '200px'
};

export class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={
                    {
                        lat: this.props.lat,
                        lng: this.props.lng
                    }
                }
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDUbaWXElSVLXYTxU4iIDDaBLx73U3_nJQ'
})(MapContainer);