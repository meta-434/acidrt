import React, { Component } from 'react';
import './Main.css'

export default class Main extends Component {
    render(){
        return(
            <main>
                <section>
                    <header role="banner">
                        <p className="login-note"><em>For testing authorized user functionality, use:<br />username: acps-employee <br />password: ilovemywatershed</em></p>
                        <h1>Albemarle County / Rivanna Stormwater</h1>
                        <h2>Illicit Discharge Reporting</h2>
                    </header>
                </section>
                <section>
                    <header>
                        <h3>Stormdrains are designed to handle stormwater runoff <em>only!</em></h3>
                    </header>
                    <p>They do not provide treatment to clean and purify the water or anything else that enters storm sewer systems. The City of Charlottesville, the County of Albemarle, and the University of Virginia manage the storm drain systems throughout our community.</p>
                    <br />
                    <p>As part of their Illicit Discharge Detection and Elimination (IDDE) programs, the members of RSEP have set up a hot line number for citizens to call (434-202-4179) if they suspect they have witnessed illicit dumping into or near a storm drain, or other potential water pollution incidents. If you are not sure whether an illicit discharge has occurred, we suggest you report it anyway, and we can determine whether some action is required to protect the water supply and/or the environment.</p>
                </section>
                <section>
                    <header>
                        <h3>How to report a pollution problem?</h3>
                    </header>
                    <p>To report a suspected illicit discharge, complete the online reporting form or call 434-202-4179. This is not an emergency response number. To report an emergency, please call 911.</p>
                    <p><em><b>REMEMBER: You don't need an account to submit a report!</b></em></p>
                </section>
                <section>
                    <header>
                        <h3>What are Some Examples of Illicit Discharges?</h3>
                    </header>
                    <p>Proper disposal of common household chemicals and products is important to prevent pollution of our local waterways. Under no circumstances should anything be disposed of down a storm drain or directly into a local drainageway.  The following is a list of common sources of illicit discharges:</p>
                    <ul>
                        <li>“Gray Water” such as laundry, shower, or kitchen waste water.</li>
                        <li>Paints, solvents, cleaning products and other toxic household substances</li>
                        <li>Gasoline, motor oil, brake fluid, engine coolant (antifreeze) and other toxic automotive products.</li>
                        <li>Septic tank pumpout and other types of human or animal waste.</li>
                        <li>Fertilizers, pesticides, herbicides and other agricultural products.</li>
                        <li>Cooking oil or grease.</li>
                    </ul>
                </section>
                <section>
                    <header>
                        <h3> What are Some Indications that an Illicit Discharge Has Occurred?</h3>
                    </header>
                    <ul>
                        <li>An unnatural color in the water.</li>
                        <li>An oil sheen floating on the water.</li>
                        <li>Floatables such as toilet paper or suds.</li>
                        <li>A foul or unnatural odor.</li>
                        <li>Dead fish or other aquatic creatures.</li>
                    </ul>
                </section>
            </main>
        );
    }
}