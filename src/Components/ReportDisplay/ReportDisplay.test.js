import React from 'react';
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom';
import AcidrtContext from "../../AcidrtContext";
import {BrowserRouter, Route} from "react-router-dom";
import ReportDisplay from "./ReportDisplay";

test('NotesDisplay renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <AcidrtContext.Provider value={{
                reports: [
                    {
                        id: 0,
                        first: 'john',
                        last: 'doe',
                        email: 'email@email.com',
                        lat: 38.030425,
                        lng: -78.561065,
                        error: undefined,
                        date: '2020-02-02',
                        time: '12:01',
                        phone: '123-123-1234',
                        type: ["Suspicious discharge from pipe into stream"],
                        waterBody: 'James River'
                    },
                    {
                        id: 1,
                        date: "2020-01-01",
                        details: "take 4 lefts.",
                        email: "acyrush@gmail.com",
                        error: undefined,
                        first: "Alexandre",
                        last: "Hapgood",
                        lat: 38.09802480089654,
                        lng: -78.4887256216315,
                        other: "lorem ipsum other details",
                        phone: "434-249-7488",
                        time: "12:34",
                        type: ["Suspicious discharge from pipe into stream", "Suspicious suds or other substance floating on water"],
                        waterBody: "oh so much water in the lake",
                    }
                ],
            }}>
                <Route path="/all-reports/:reportId" render={props => <ReportDisplay {...props} />} />
            </AcidrtContext.Provider>
        </BrowserRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
})

test('ReportDisplay renders correctly', () => {
    const tree = renderer
        .create(
            <BrowserRouter>
                <AcidrtContext.Provider value={{
                    reports: [
                        {
                            id: 0,
                            first: 'john',
                            last: 'doe',
                            email: 'email@email.com',
                            lat: 38.030425,
                            lng: -78.561065,
                            error: undefined,
                            date: '2020-02-02',
                            time: '12:01',
                            phone: '123-123-1234',
                            type: ["Suspicious discharge from pipe into stream"],
                            waterBody: 'James River'
                        },
                        {
                            id: 1,
                            date: "2020-01-01",
                            details: "take 4 lefts.",
                            email: "acyrush@gmail.com",
                            error: undefined,
                            first: "Alexandre",
                            last: "Hapgood",
                            lat: 38.09802480089654,
                            lng: -78.4887256216315,
                            other: "lorem ipsum other details",
                            phone: "434-249-7488",
                            time: "12:34",
                            type: ["Suspicious discharge from pipe into stream", "Suspicious suds or other substance floating on water"],
                            waterBody: "oh so much water in the lake",
                        }
                    ]
                }}>
                    <Route path="/all-reports/:reportId" render={props => <ReportDisplay {...props} />} />
                </AcidrtContext.Provider>
            </BrowserRouter>
        )
        .toJSON();

    // console.log(tree);
    expect(tree).toMatchSnapshot();
});
