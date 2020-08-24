import React from "react";
import App from "./App";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Components/Nav/Nav";

test("renders the app landing page", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
