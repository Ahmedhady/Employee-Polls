import Login from "../components/Login";
import { render, fireEvent } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import reducer from "../reducers";
import middleware from "../middleware";
import thunk from 'redux-thunk';
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { handleInitialData } from "../actions/shared";

const store = createStore(reducer, applyMiddleware(thunk));
//const store = createStore(reducer, middleware);

describe("login", () => {
  it("matches the snapshot", () => {
    const component = render(<MemoryRouter><Provider store={store}><Login /></Provider></MemoryRouter>);
    expect(component).toMatchSnapshot();
  });

  it("verify of Enter name & password and login", () => {
    const component = render(<MemoryRouter><Provider store={store}><Login /></Provider></MemoryRouter>);
    expect(component.getByTestId("testId-name-input")).toBeInTheDocument();
    expect(component.getByTestId("testId-password-input")).toBeInTheDocument();
    expect(component.getByTestId("testId-submit-button")).toBeInTheDocument();
    });

  it("verify of no error with valid name and password", () => {
    const component = render(<MemoryRouter><Provider store={store}><Login /></Provider></MemoryRouter>);

    const nameInput = component.getByTestId("testId-name-input");
    fireEvent.change(nameInput, { target: { value: "tylermcginnis" } });
    expect(nameInput).toBeInTheDocument();

    const passwordInput = component.getByTestId("testId-password-input");
    fireEvent.change(passwordInput, { target: { value: "abc321" } });
    expect(passwordInput).toBeInTheDocument();

    const submitButton = component.getByTestId("testId-submit-button");
    fireEvent.click(submitButton);
    expect(submitButton).toBeInTheDocument();
  });
});