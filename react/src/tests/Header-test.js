
const mock = require('jest-mock');
import React from 'react';
import { Provider } from 'react-intl-redux';
import { put, select, call } from "redux-saga/effects";
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy } from "expect";
import { addLocaleData } from 'react-intl';

import HeaderContainer from 'containers/Header';
import * as actions from "actions/Header";
import { requestLogout, sendLogout } from "sagas/Header";

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


describe("Header Actions", () => {

    it("Should start logout ", () => {
       const expectedAction = {
           type: actions.POST_LOGOUT
       };
       expect(actions.startLogout()).toEqual(expectedAction);
   });

   it("Logout failure ", () => {
       const err = new Error('Error'),
             data = {
                 error: err,
                 message: err.toString()
             };
       const expectedAction = {
           type: actions.POST_AUTHN_LOGOUT_FAIL,
           error: true,
           payload: data
       };
       expect(actions.postLogoutFail(err)).toEqual(expectedAction);
   });
});


const state = {
    config : {
        csrf_token: '123456789',
        TOKEN_SERVICE_URL: 'test/localhost'
    },
    intl: {
        locale: 'en',
        messages: messages
    }
};

describe("Async component", () => {

    it("Sagas requestLogout", () => {

       const generator = requestLogout();
       let next = generator.next();

       const data = {
                csrf_token: state.config.csrf_token
              };

       const resp = generator.next(state);
       const url = state.config.TOKEN_SERVICE_URL;
       expect(resp.value).toEqual(call(sendLogout, url, data));
       const dummyLocation = 'dummy-location',
             testingWindow = {location: ""},
             action = {
                 type: actions.POST_AUTHN_LOGOUT_SUCCESS,
                 payload: {
                     csrf_token: 'csrf-token',
                     location: dummyLocation
                 },
                 testingWindow: testingWindow
             };
       next = generator.next(action);
       expect(next.value.PUT.action.type).toEqual('NEW_CSRF_TOKEN');

       generator.next();
       expect(testingWindow.location).toEqual(dummyLocation);
    });
});

const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
});

function setupComponent() {
    const store = fakeStore({
        intl: {
            locale: 'en',
            messages: messages
        },
        emails: {
            emails: []
        },
        nins: {
            nins: []
        }
    });
    const props = {
        email: 'fake@fake.fake',
        confirmed: 'main.confirmed'
    };
    const wrapper = mount(<Provider store={ store }>
                              <HeaderContainer {...props} />
                          </Provider>);
    return {
        props,
        wrapper
    };
}

describe("Header Component", () => {

    it("Renders", () => {
        const { wrapper, props } = setupComponent(),
              header = wrapper.find('header#header'),
              logo = wrapper.find('div#eduid-logo-small'),
              menu = wrapper.find('div#eduid-menu'),
              button = wrapper.find('button#logout-button');

        expect(header.contains(logo.get(0))).toBeTruthy();
        expect(header.contains(menu.get(0))).toBeTruthy();
        expect(header.contains(button.get(0))).toBeTruthy();
    });
});
