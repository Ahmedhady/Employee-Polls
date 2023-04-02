import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import NewQuestion from "../components/NewQuestion";
import { MemoryRouter } from 'react-router';
import reducer from "../reducers";
import { applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { createStore } from "redux";

const store = createStore(reducer, applyMiddleware(thunk));

describe("NewQuestion", () => {
    it("matches the snapshot", () => {
        const component = render(<MemoryRouter><Provider store={store}><NewQuestion /></Provider></MemoryRouter>);
        expect(component).toMatchSnapshot();
    });
});