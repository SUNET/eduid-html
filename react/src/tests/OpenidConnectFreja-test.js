
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


Object.defineProperty(navigator, "userAgent", {
  get: function () {
    return this.testUserAgent;
  }
});


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
    handleInitializeFrejaProofing: createSpy(),
    iaRequestData: "",
  };

  const wrapper = mount(<IntlProvider locale={'en'} messages={messages}>
                              <OpenidConnectFreja {...props} />
                          </IntlProvider>);

  return {
    props,
    wrapper
  };
}

describe("OpenidConnectFreja Component using a mobile device", () => {

  it("Renders", () => {
    navigator.testUserAgent = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36"; // Mobile

    const { wrapper, props } = setupComponent(),
          form = wrapper.find('form'),
          fieldset = wrapper.find('fieldset'),
          button = wrapper.find('EduIDButton');

    expect(form.hasClass('form-horizontal')).toBeTruthy();
    expect(form.contains(fieldset.get(0))).toBeTruthy();
    expect(fieldset.contains(button.get(0))).toBeTruthy();

    expect(form.props()).toContain({role: 'form'});
    expect(fieldset.props()).toContain({id: 'openid-connect-freja'});

    expect(button.hasClass('btn')).toBeTruthy();
    expect(props.handleInitializeFrejaProofing.calls.length).toEqual(0);
    button.props().onClick();
    expect(props.handleInitializeFrejaProofing.calls.length).toEqual(1);
  })
});

describe("OpenidConnectFreja Component using a non mobile device", () => {

  it("Renders", () => {
    navigator.testUserAgent = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0"; // Desktop

    const { wrapper, props } = setupComponent(),
          heading = wrapper.find('h4'),
          msg = wrapper.find('p'),
          button = wrapper.find('EduIDButton');

    expect(heading.exists()).toBeTruthy();
    expect(msg.exists()).toBeTruthy();

    expect(button.exists()).toBeFalsy();

  })
});

const fakeStore = (state) => ({
  default: () => {},
  dispatch: createSpy(),
  subscribe: createSpy(),
  getState: () => ({ ...state })
});

describe("OpenidConnectFreja Container before initiated vetting", () => {

  let fulltext,
      mockProps,
      wrapper,
      dispatch;

  beforeEach(() => {
    navigator.testUserAgent = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36"; // Mobile
    const store = fakeStore({
      openid_freja_data: {
        is_fetching: false,
        failed: false,
        iaRequestData: ''
      },
      config: {OIDC_PROOFING_FREJA_URL: 'http://localhost/services/oidc-proofing/freja/proofing'},
    });

    mockProps = {
      iaRequestData: '',
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

  it("Clicks", () => {
    fetchMock.post('http://localhost/services/oidc-proofing/freja/proofing',
      {
        type: actions.POST_OIDC_PROOFING_PROOFING_SUCCESS,
        payload: {iaRequestData: 'abc123'}
      });

    expect(dispatch.calls.length).toEqual(0);
    wrapper.find('Button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
  });

});


describe("OpenidConnectFreja Container after initiated vetting", () => {

  let fulltext,
      iaRequestData,
      mockProps,
      wrapper,
      dispatch;

  beforeEach(() => {
    navigator.testUserAgent = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36"; // Mobile
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

  it("Changes to link", () => {
    iaRequestData = wrapper.find('Button').props().href;
    expect(iaRequestData).toEqual('frejaeid://identify?iaRequestData=abc123');
  });

});


const state = {
config : {
    OIDC_PROOFING_FREJA_URL: 'http://localhost/services/oidc-proofing/freja/proofing'
}
};

import {requestOpenidFrejaData, initializeOpenidFrejaData, fetchFrejaData} from '../sagas/OpenidConnectFreja';
import { put, call, select } from "redux-saga/effects";

describe("Async component", () => {

    it("Sagas initializeOpenidFrejaData", () => {

       const generator = initializeOpenidFrejaData();

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

       const action = {
         type: actions.POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS,
         payload: {
             iaRequestData: 'def456',
             csrf_token: 'csrf-token'
         }
       }
       next = generator.next(action);
       expect(next.value.PUT.action.type).toEqual('NEW_CSRF_TOKEN');
       next = generator.next();
       delete(action.payload.csrf_token);
       expect(next.value).toEqual(put(action));
    });

});
