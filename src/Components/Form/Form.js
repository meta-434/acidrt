import React, { Component } from 'react';
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import MapComponent from "../Map/MapComponent";
import AcidrtContext from "../../AcidrtContext";

export default class Form extends Component {

    static contextType = AcidrtContext;

    state = {
        first: undefined,
        last: undefined,
        email: undefined,
        phone: undefined,
        lat: undefined,
        lng: undefined,
        type: [],
        waterBody: undefined,
        details: undefined,
        date: undefined,
        time: undefined,
        error: undefined,
    }

    handlePostReport = (e) => {
        e.preventDefault();
        this.context.handlePostReport(this.state);
    }

    handleLatLng = (lat, lng) => {
        console.log('called');
        this.setState({lat, lng});
    }

    handleFirstName = (e) => {
        // console.log(e.target.value)
        this.setState({first: e.target.value})
    }

    handleLastName = (e) => {
        // console.log(e.target.value)
        this.setState({last: e.target.value})
    }

    handleEmail = (e) => {
        // console.log(e.target.value)
        this.setState({email: e.target.value})
    }

    handlePhone = (e) => {
        const phone = e.target.value;

        const regExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
        const isValid = phone.match(regExp);
        if (!isValid) {
            this.setState({error: 'phone must be xxx-xxx-xxxx'})
        }
        this.setState({phone: e.target.value, error: undefined}, () => console.log(this.state.phone, this.state.error))

    }



    handleType = (e) => {
        const currType = this.state.type;

        if (currType.includes(e.target.value)) {
            const idx = currType.indexOf(e.target.value);
            currType.splice(idx, 1);
            this.setState({type: currType})
        } else {
            currType.push(e.target.value);
            this.setState({type: currType})
        }

         console.log(this.state.type);

    }

    handleOtherText = (e) => {
       // console.log(e.target.value)
        this.setState({other: e.target.value})
    }

    handleWaterBody = (e) => {
        // console.log(e.target.value)
        this.setState({waterBody: e.target.value})
    }

    handleDetails = (e) => {
        // console.log(e.target.value)
        this.setState({details: e.target.value})
    }

    handleDate = (e) => {
        // console.log(e.target.value)
        this.setState({date: e.target.value})
    }

    handleTime = (e) => {
        console.log(e.target.value)
        this.setState({time: e.target.value})
    }

    checkIfSubmittable = () => {
        console.log(!!this.state.lat && !!this.state.lng && !this.state.error);
        console.log(!this.state.lng);
        return !(!!this.state.lat && !!this.state.lng && !this.state.error);
    }

    render(){
        return(
            <>
                <section>
                    <header>
                        <h3>Illicit Discharge Report</h3>
                    </header>
                </section>
                <section className={'error-section'}>
                    {
                        (!!this.context.error)
                            ? <ErrorDisplay />
                            : ''
                    }
                </section>
                <section className={'form-section'}>
                    <form
                        className={'react-form'}
                        onSubmit={this.handlePostReport}
                    >
                        <label htmlFor='first-name'>first name: </label>
                        <br />
                        <input
                            type="text"
                            id="first-name"
                            name="first-name"
                            className="first-name"
                            onChange={this.handleFirstName}
                            placeholder={'enter first name'}
                            aria-label="first name"
                            aria-required="true"
                            aria-describedby="error-box"
                        />
                        <br />
                        <label htmlFor='last-name'>last name: </label>
                        <br />
                        <input
                            type="text"
                            id="last-name"
                            name="last-name"
                            className="last-name"
                            onChange={this.handleLastName}
                            placeholder={'enter last name'}
                            aria-label="last-name"
                            aria-required="true"
                            aria-describedby="error-box"
                        />
                        <br />
                        <label htmlFor='email'>email: </label>
                        <br />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="email"
                            onChange={this.handleEmail}
                            placeholder={'enter email'}
                            title={'must be in format xxx@yyy.zzz'}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            aria-label="username"
                            aria-required="true"
                            aria-describedby="error-box"
                        />
                        <br />
                        <label htmlFor='phone'>phone number: </label>
                        <br />
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="phone"
                            onChange={this.handlePhone}
                            placeholder={'enter phone'}
                            title={'must be in format xxx-xxx-xxxx'}
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            aria-label="password"
                            aria-required="true"
                            aria-describedby="error-box"
                        />
                        <br />
                        <label htmlFor={'map-latlng'}>Discharge Location</label>
                        <br />
                        <input
                            placeholder={'move pin to incident location'}
                            defaultValue={ (this.state.lat && this.state.lng)
                                ?`${
                                    Number.parseFloat(this.state.lat).toPrecision(6)
                                    + ', ' +
                                    Number.parseFloat(this.state.lng).toPrecision(6)
                                }`
                                :undefined}
                            type={'text'}
                            id={'map-latlng'}
                            name={'map-latlng'}
                            className={'map-latlng'}
                            disabled={true}
                            aria-label={'map latitude longitude'}
                            aria-required={true}
                            aria-describedby={'error-box'}
                        />
                        <MapComponent updateLatLng={(lat, lng) => this.handleLatLng(lat, lng)}/>
                        <br />
                        <input onChange={this.handleType} type="checkbox" id="1" name="1" value="Dumping down a storm drain" />
                        <label htmlFor="1">Dumping down a storm drain</label>
                        <br />
                        <input onChange={this.handleType} type="checkbox" id="2" name="2" value="Suspicious discharge from pipe into stream" />
                        <label htmlFor="2">Suspicious discharge from pipe into stream</label>
                        <br />
                        <input onChange={this.handleType} type="checkbox" id="3" name="3" value="Water in stream is an unusual color" />
                        <label htmlFor="3">Water in stream is an unusual color</label>
                        <br />
                        <input onChange={this.handleType} type="checkbox" id="4" name="4" value="Water in stream smells strange" />
                        <label htmlFor="4">Water in stream smells strange</label>
                        <br />
                        <input onChange={this.handleType} type="checkbox" id="5" name="5" value="Suspicious suds or other substance floating on water" />
                        <label htmlFor="5">Suspicious suds or other substance floating on water</label>
                        <br />
                        <input onChange={this.handleType} type="checkbox" id="6" name="6" value="Fish or other aquatic creatures appear to have died" />
                        <label htmlFor="6">Fish or other aquatic creatures appear to have died</label>
                        <br />
                        <input onChange={this.handleType} type="checkbox" id="7" name="7" value="other" />
                        <label htmlFor="7">Other (please describe below)</label>
                        <br />
                        <br />
                        <label htmlFor="other-text">if other, enter details:</label>
                        <br />
                        <input
                            type="text"
                            id="other-text"
                            name="other-text"
                            className="other-text"
                            onChange={this.handleOtherText}
                            placeholder={'enter details'}
                            aria-label="other-text"
                            aria-required="false"
                            aria-describedby="error-box"
                        />
                        <br />
                        <label htmlFor="water-body">Describe the creek or body of water affected:</label>
                        <br />
                        <input
                            type="text"
                            id="water-body"
                            name="water-body"
                            className="water-body"
                            onChange={this.handleWaterBody}
                            placeholder={'enter water body details'}
                            aria-label="water-body"
                            aria-required="false"
                            aria-describedby="error-box"
                        />
                        <br />
                        <label htmlFor="water-body">Please add any details that might help a responder locate the site to take a sample:</label>
                        <br />
                        <textarea
                            id="details"
                            name="details"
                            className="details"
                            onChange={this.handleDetails}
                            placeholder={'enter extra details'}
                            aria-label="details"
                            aria-required="false"
                            aria-describedby="error-box"
                        />
                        <br />
                        <label htmlFor={'date'}>Enter the DATE of the incident</label>
                        <br />
                        <input
                            type={'date'}
                            id={'date'}
                            className={'date'}
                            onChange={this.handleDate}
                            aria-label={'date'}
                            aria-required={"true"}
                            aria-describedby={'error-box'}
                        />
                        <br />
                        <label htmlFor={'time'}>Enter the TIME of the incident</label>
                        <br />
                        <input
                            type={'time'}
                            id={'time'}
                            className={'time'}
                            onChange={this.handleTime}
                            aria-label={'time'}
                            aria-required={"true"}
                            aria-describedby={'error-box'}
                        />
                        <br />
                        <button
                            className="submit-button"
                            type="submit"
                            disabled={this.checkIfSubmittable()}>
                            Submit
                        </button>
                    </form>
                    <section className="error-box" id="error-box" aria-live="assertive">
                        {/** enter new validation message logic**/}
                    </section>
                </section>

            </>
        );
    }
}