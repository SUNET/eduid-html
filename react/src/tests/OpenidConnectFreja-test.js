
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetch from "whatwg-fetch";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import * as actions from "actions/OpenidConnectFreja";
import openidConnectFrejaReducer from "reducers/OpenidConnectFreja";
import OpenidConnectFreja from 'components/OpenidConnectFreja'

import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import OpenidConnectFrejaContainer from "containers/OpenidConnectFreja";

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


describe("OIDC Freja Actions", () => {

  it("should create an action to trigger fetching of request data", () => {
    const expectedAction = {
      type: actions.POST_OIDC_PROOFING_FREJA_PROOFING
    };
    expect(actions.postOpenidFreja()).toEqual(expectedAction);
  });

  it("should create an action to signal an error fetching request data", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.POST_OIDC_PROOFING_FREJA_PROOFING_FAIL,
      error: true,
      payload: {
        error: 'Bad error',
        message: 'Bad error'
      }
    };
    expect(actions.postOpenidFrejaFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {

  const mockState = {
    is_fetching: false,
    failed: false,
    iaRequestData: "",
  };

  it("Receives a POST_OIDC_PROOFING_FREJA_PROOFING action", () => {
    expect(
      openidConnectFrejaReducer(
        mockState,
        {
          type: actions.POST_OIDC_PROOFING_FREJA_PROOFING
        }
      )
    ).toEqual(
      {
				is_fetching: true,
				failed: false,
				iaRequestData: "",
      }
    );
  });

  it("Receives a POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS action", () => {
    expect(
      openidConnectFrejaReducer(
        mockState,
        {
          type: actions.POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS,
          payload: { iaRequestData: 'def456' }
        }
      )
    ).toEqual(
      {
				is_fetching: false,
				iaRequestData: "def456",
        failed: false
      }
    );
  });

  it("Receives a POST_OIDC_PROOFING_FREJA_PROOFING_FAIL action", () => {
    expect(
      openidConnectFrejaReducer(
        mockState,
        {
          type: actions.POST_OIDC_PROOFING_FREJA_PROOFING_FAIL,
          error: true,
          payload: {
            error: "Bad error",
            message: "Bad error"
          }
        }
      )
    ).toEqual(
      {
				is_fetching: false,
				iaRequestData: "",
        failed: true,
        error: "Bad error"
      }
    );
  });

  it("Receives a DUMMY action", () => {
    expect(
      openidConnectFrejaReducer(
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
        iaRequestData: "",
      }
    );
  });
});


function setupComponent() {
  const props = {
    handleOpenFrejaApp: createSpy(),
    iaRequestData: "abc123",
  };

  const wrapper = mount(<IntlProvider locale={'en'} messages={messages}>
                              <OpenidConnectFreja {...props} />
                          </IntlProvider>);

  return {
    props,
    wrapper
  };
}

describe("OpenidConnectFreja Component", () => {

  it("Renders", () => {
    const { wrapper, props } = setupComponent(),
          form = wrapper.find('form'),
          fieldset = wrapper.find('fieldset'),
          button = wrapper.find('EduIDButton');

    expect(form.hasClass('form-horizontal')).toBeTruthy();
    expect(form.contains(fieldset.get(0))).toBeTruthy();
    expect(fieldset.contains(button.get(0))).toBeTruthy();

    expect(form.props()).toContain({role: 'form'});
    expect(fieldset.props()).toContain({id: 'openid-connect-freja'});

    expect(props.handleOpenFrejaApp.calls.length).toEqual(0);
    button.props().onClick();
    expect(props.handleOpenFrejaApp.calls.length).toEqual(1);
  })
});


const fakeStore = (state) => ({
  default: () => {},
  dispatch: createSpy(),
  subscribe: createSpy(),
  getState: () => ({ ...state })
});

describe("OpenidConnectFreja Container", () => {
  let fulltext,
      iaRequestData,
      mockProps,
      wrapper,
      dispatch;

  beforeEach(() => {
    const store = fakeStore({
      openid_freja_data: {
        is_fetching: false,
        failed: false,
        iaRequestData: 'abc123'
      },
      config: {OIDC_PROOFING_FREJA_URL: 'http://localhost/services/oidc-proofing/freja/proofing'},
    });

    mockProps = {
      iaRequestData: 'abc123',
    };

    wrapper = mount(
        <IntlProvider locale={'en'} messages={messages}>
          <Provider store={store}>
            <OpenidConnectFrejaContainer {...mockProps}/>
          </Provider>
        </IntlProvider>
    );

    fulltext = wrapper.find(OpenidConnectFrejaContainer).text();
    dispatch = store.dispatch;
  });


  afterEach(() => {
    fetchMock.restore()
  });

  it("Renders", () => {
    expect(iaRequestData).toEqual('frejaeid://identify?iaRequestData=abc123');
  });

  it("Clicks", () => {

    fetchMock.post('http://localhost/services/oidc-proofing/freja/proofing',
       {
        type: actions.POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS,
        payload: {iaRequestData: 'abc123'}
      });

    iaRequestData = wrapper.find('Button').props().href;
    expect(iaRequestData).toEqual('frejaeid://identify?iaRequestData=abc123');

    expect(dispatch.calls.length).toEqual(0);
    wrapper.find('Button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
  });

});


const state = {
config : {
    OIDC_PROOFING_FREJA_URL: 'http://localhost/services/oidc-proofing/freja/proofing'
}
};

import {requestOpenidFrejaData, fetchFrejaData} from '../sagas/OpenidConnectFreja';
import { put, call, select } from "redux-saga/effects";

describe("Async component", () => {

    it("Sagas requestOpenidFrejaData", () => {

       const generator = requestOpenidFrejaData();

       let next = generator.next();
       let debug = select(state => state.config.OIDC_PROOFING_FREJA_URL);
       // WE need modfied the following selector due a problems with indent.
       // The test fails if we dont do that, previous selector:
       // function (state) {
	   //                     return state.config.OIDC_PROOFING_URL;
	   //                 }
       next.value.SELECT.selector = function (state) {
         return state.config.OIDC_PROOFING_FREJA_URL;
       };

       expect(next.value).toEqual(debug);

       const oidcFrejaData = generator.next(next.value);
       const  data = {
                'nin': 'testing'
              };
       expect(oidcFrejaData.value).toEqual(call(fetchFrejaData, debug, data));

       next = generator.next(oidcFrejaData.value);
       expect(next.value).toEqual(put(oidcFrejaData.value));

    });

});
