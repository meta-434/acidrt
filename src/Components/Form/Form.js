import React, { Component } from 'react';
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import MapComponent from "../Map/MapComponent";
import AcidrtContext from "../../AcidrtContext";
import {Link} from "react-router-dom";
import './Form.css';

function populateType (currTypeState) {
    if (!Array.isArray(currTypeState)) {
        const newTypeState = currTypeState.split(',');
        return newTypeState;
    }
    return currTypeState;
}

export default class Form extends Component {

    static contextType = AcidrtContext;

    state = {
        first: (this.props.defaultVals && this.props.defaultVals.report_first) || undefined,
        last: (this.props.defaultVals && this.props.defaultVals.report_last) || undefined,
        email: (this.props.defaultVals && this.props.defaultVals.report_email) || undefined,
        phone: (this.props.defaultVals && this.props.defaultVals.report_phone) || undefined,
        lat: (this.props.defaultVals && this.props.defaultVals.report_lat) || undefined,
        lng: (this.props.defaultVals && this.props.defaultVals.report_lng) || undefined,
        type: (this.props.defaultVals && populateType(this.props.defaultVals.report_type)) || [],
        waterBody: (this.props.defaultVals && this.props.defaultVals.report_waterbody) || undefined,
        details: (this.props.defaultVals && this.props.defaultVals.report_details) || undefined,
        date: (this.props.defaultVals && this.props.defaultVals.report_date) || undefined,
        time: (this.props.defaultVals && this.props.defaultVals.report_time) || undefined,
        other: (this.props.defaultVals && this.props.defaultVals.report_other) || undefined,
        error: undefined,
    }

    handleUpdateReport = (e) => {
        e.preventDefault();
        this.context.handleEditReport(this.props.defaultVals.id, {
            report_first: this.state.first,
            report_last: this.state.last,
            report_email: this.state.email,
            report_phone: this.state.phone,
            report_lat: parseFloat(this.state.lat),
            report_lng: parseFloat(this.state.lng),
            report_date: this.state.date,
            report_time: this.state.time,
            report_type: this.state.type.join(),
            report_waterbody: this.state.waterBody,
            report_other: this.state.other,
            report_details: this.state.details,
        })
            .then(result => result)
            .then(() => this.props.toggleEdit());
    }

    handlePostReport = (e) => {
        e.preventDefault();
        this.context.handlePostReport({
            report_first: this.state.first,
            report_last: this.state.last,
            report_email: this.state.email,
            report_phone: this.state.phone,
            report_lat: parseFloat(this.state.lat),
            report_lng: parseFloat(this.state.lng),
            report_date: this.state.date,
            report_time: this.state.time,
            report_type: this.state.type.join(),
            report_waterbody: this.state.waterBody,
            report_other: this.state.other,
            report_details: this.state.details,
       })
            .then(() => this.props.history.push('/'))
    }

    handleLatLng = (lat, lng) => {
        this.setState({lat, lng, error: ''});
    }

    handleFirstName = (e) => {
        // console.log(e.target.value)
        if (e.target.value === '') this.setState({first: e.target.value, error: 'first name missing'});
        else {
            this.setState({first: e.target.value, error: undefined})
        }
    }

    handleLastName = (e) => {
        if (e.target.value === '') this.setState({last: e.target.value, error: 'last name missing'});
        else {
            this.setState({last: e.target.value, error: undefined})
        }
    }

    handleEmail = (e) => {
        if (e.target.value === '') this.setState({email: e.target.value, error: 'email missing'});
        else {
            this.setState({email: e.target.value, error: undefined})
        }
    }

    handlePhone = (e) => {
        const phone = e.target.value;
        const regExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;

        if (phone === undefined || phone === '') {
            this.setState({phone, error: 'phone missing'})
        }
        else if (!new RegExp(regExp).test(phone)) {
            this.setState({phone, error: 'phone must be xxx-xxx-xxxx'})
        }
        else {
            this.setState({phone, error: undefined})
        }
    }

    handleType = (e) => {
        const currType = this.state.type;
        console.log(e.target.name);
        if (currType.includes(e.target.name)) {
            const idx = currType.indexOf(e.target.name);
            currType.splice(idx, 1);
            this.setState({type: currType})
        } else {
            currType.push(e.target.name);
            this.setState({type: currType})
        }

        this.setState({error: ''})
         // console.log(this.state.type);
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
        // console.log(e.target.value)
        this.setState({time: e.target.value})
    }

    checkIfSubmittable = () => {
        // console.log(!(!!this.state.lat && !!this.state.lng && !this.state.error));
        return !(!!this.state.lat && !!this.state.lng && this.state.first && this.state.last && this.state.email && this.state.type && !this.state.error);
    }

    render(){
        return(
            <>
                <section>
                    <header>
                        <h3>Illicit Discharge Report</h3>
                        <h4>Fields marked with * are required</h4>
                    </header>
                </section>
                <section className={'error-section'}>
                    {
                        (!!this.context.error)
                            ? <ErrorDisplay />
                            : ''
                    }
                </section>
                {(!!this.state.subRec)
                    ? (
                        <div>
                            <h4>Submission Received</h4>
                            <Link to={'/'}>Go Home</Link>
                        </div>)
                    :
                <section className={'form-section'}>
                    <form
                        className={'react-form'}
                        onSubmit={this.handlePostReport}
                    >
                        <label htmlFor='first-name'>first name: * </label>
                        <br />
                        <input
                            value={this.state.first}
                            required
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
                        <label htmlFor='last-name'>last name: * </label>
                        <br />
                        <input
                            value={this.state.last}
                            required
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
                        <label htmlFor='email'>email: * </label>
                        <br />
                        <input
                            value={this.state.email}
                            required
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
                        <label htmlFor='phone'>phone number: * </label>
                        <br />
                        <label>enter in 'xxx-xxx-xxxx' format</label>
                        <br />
                        <input
                            value={this.state.phone}
                            required
                            type="tel"
                            id="phone"
                            name="phone"
                            className="phone"
                            onChange={this.handlePhone}
                            placeholder={'xxx-xxx-xxxx'}
                            title={'must be in format xxx-xxx-xxxx'}
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            aria-label="password"
                            aria-required="true"
                            aria-describedby="error-box"
                        />
                        <br />
                        <label htmlFor={'map-latlng'}>Discharge Location: * </label>
                        <br />
                        <input
                            required
                            value={`${this.state.lat}, ${this.state.lng}`}
                            placeholder={ (this.state.lat && this.state.lng)
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
                        <label>Incident Type: * </label>
                        <br />
                        <input onChange={this.handleType} type="checkbox" id="1" name="Dumping down a storm drain" defaultChecked={this.state.type.includes('Dumping down a storm drain')}/>
                        <label htmlFor="1">Dumping down a storm drain</label>
                        <br />
                        <input onChange={this.handleType} type="checkbox" id="2" name="Suspicious discharge from pipe into stream" defaultChecked={this.state.type.includes('Suspicious discharge from pipe into stream')}/>
                        <label htmlFor="2">Suspicious discharge from pipe into stream</label>
                        <br />
                        <input onChange={this.handleType} type="checkbox" id="3" name="Water in stream is an unusual color" defaultChecked={this.state.type.includes('Water in stream is an unusual color')}/>
                        <label htmlFor="3">Water in stream is an unusual color</label>
                        <br />
                        <input onChange={this.handleType} type="checkbox" id="4" name="Water in stream smells strange" defaultChecked={this.state.type.includes('Water in stream smells strange')}/>
                        <label htmlFor="4">Water in stream smells strange</label>
                        <br />
                        <input onChange={this.handleType} type="checkbox" id="5" name="Suspicious suds or other substance floating on water" defaultChecked={this.state.type.includes('Suspicious suds or other substance floating on water')}/>
                        <label htmlFor="5">Suspicious suds or other substance floating on water</label>
                        <br />
                        <input onChange={this.handleType} type="checkbox" id="6" name="Fish or other aquatic creatures appear to have died" defaultChecked={this.state.type.includes('Fish or other aquatic creatures appear to have died')}/>
                        <label htmlFor="6">Fish or other aquatic creatures appear to have died</label>
                        <br />
                        <input onChange={this.handleType} type="checkbox" id="7" name="other" defaultChecked={this.state.type.includes('other')}/>
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
                            defaultValue={this.state.other}
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
                            defaultValue={this.state.waterBody}
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
                            defaultValue={this.state.details}
                            placeholder={'enter extra details'}
                            aria-label="details"
                            aria-required="false"
                            aria-describedby="error-box"
                        />
                        <br />
                        <label htmlFor={'date'}>Enter the DATE of the incident *</label>
                        <br />
                        <input
                            required
                            type={'date'}
                            id={'date'}
                            className={'date'}
                            onChange={this.handleDate}
                            defaultValue={this.state.date}
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
                            defaultValue={this.state.time}
                            aria-label={'time'}
                            aria-required={"true"}
                            aria-describedby={'error-box'}
                        />
                        <br />
                        {
                            (this.props.editMode)
                            ? (<button onClick={(e) => this.handleUpdateReport(e)}>Done Editing</button>)
                                :(
                                    <button
                                        className="submit-button"
                                        type="submit"
                                        disabled={this.checkIfSubmittable()}>
                                        Submit
                                    </button>
                                )
                        }

                    </form>
                    <section className="error-box" id="error-box" aria-live="assertive">
                        {(this.state.error && this.state.error !== undefined) ? ('error: ' + this.state.error) : ''}
                    </section>
                </section> }

            </>
        );
    }
}