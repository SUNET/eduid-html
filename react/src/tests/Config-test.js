
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
        is_configured: false,
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
        failed: false,
        is_configured: true,
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
        is_configured: false,
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
