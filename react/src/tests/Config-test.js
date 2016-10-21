
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetch from "whatwg-fetch";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import * as actions from "actions/Config";
import configReducer from "reducers/Config";

describe("Config Actions", () => {

  it("should create an action to trigger fetching the configuration", () => {
    const expectedAction = {
      type: actions.GET_JSCONFIG_CONFIG
    };
    expect(actions.getConfig()).toEqual(expectedAction);
  });

  it("should create an action to signal an error fetching the configuration", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.GET_JSCONFIG_CONFIG_FAIL,
      error: true,
      payload: {
        error: 'Bad error',
        message: 'Bad error'
      }
    };
    expect(actions.getConfigFail(err)).toEqual(expectedAction);
  });
});


const middlewares = [ thunkMiddleware ];
const mockStore = configureStore(middlewares);

describe("Config async actions", () => {

  afterEach(() => {
    fetchMock.restore()
  });

  it("Fetch config and dispatch action with result", (done) => {

    fetchMock.get('/services/jsconfig/config',
       {
        type: actions.GET_JSCONFIG_CONFIG_SUCCESS,
        payload: {param1: 'value 1'}
      });

    const expectedActions = [
      {type: actions.GET_JSCONFIG_CONFIG},
      {type: actions.GET_JSCONFIG_CONFIG_SUCCESS,
       payload: {
         param1: 'value 1'
       }
      }
    ];

    const store = mockStore({
      config: {param1: 'no value'},
    });

    store.dispatch(actions.fetchConfig())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it("Try to fetch config but find server error", (done) => {

    fetchMock.get('/services/jsconfig/config', 500);

    const expectedActions = [
      {type: actions.GET_JSCONFIG_CONFIG},
      {
        type: actions.GET_JSCONFIG_CONFIG_FAIL,
        error: true,
        payload: {
          error: 'Error: Internal Server Error',
          message: 'Error: Internal Server Error'
        }
      }
    ];

    const store = mockStore({
      config: {param1: 'no value'},
    });

    store.dispatch(actions.fetchConfig())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it("Try to fetch config but server returns error", (done) => {

    const errorResponse = {
        type: actions.GET_JSCONFIG_CONFIG_FAIL,
        error: true,
        payload: {
          error: 'Terrible Error',
          message: 'Terrible Error'
        }
      };

    fetchMock.get('/services/jsconfig/config', errorResponse);

    const expectedActions = [
      {type: actions.GET_JSCONFIG_CONFIG},
      errorResponse
    ];

    const store = mockStore({
      config: {param1: 'no value'},
      openid_data: {qrcode: 'old code', nonce: 'old nonce'}
    });

    store.dispatch(actions.fetchConfig())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});


describe("Config reducers", () => {

  const mockState = {
    is_fetching: false,
    failed: false,
    param1: 'old value'
  };

  it("Receives a GET_CONFIG action", () => {
    expect(
      configReducer(
        mockState,
        {
          type: actions.GET_JSCONFIG_CONFIG
        }
      )
    ).toEqual(
      {
        param1: 'old value',
        is_fetching: true,
        failed: false
      }
    );
  });

  it("Receives a GET_CONFIG_SUCCESS action", () => {
    expect(
      configReducer(
        mockState,
        {
          type: actions.GET_JSCONFIG_CONFIG_SUCCESS,
          payload: { param1: 'new value' }
        }
      )
    ).toEqual(
      {
        param1: 'new value',
        is_fetching: false,
        failed: false
      }
    );
  });

  it("Receives a GET_CONFIG_FAIL action", () => {
    expect(
      configReducer(
        mockState,
        {
          type: actions.GET_JSCONFIG_CONFIG_FAIL,
          error: true,
          payload: {
            error: "Bad error",
            message: "Bad error"
          }
        }
      )
    ).toEqual(
      {
        param1: 'old value',
        is_fetching: false,
        failed: true,
      }
    );
  });

  it("Receives a DUMMY action", () => {
    expect(
      configReducer(
        mockState,
        {
          type: "DUMMY_ACTION",
          payload: "dummy payload"
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        param1: 'old value'
      }
    );
  });
});
