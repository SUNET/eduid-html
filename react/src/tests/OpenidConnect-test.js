
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import * as actions from "actions/OpenidConnect";
import openidConnectReducer from "reducers/OpenidConnect";
import OpenidConnect from 'components/OpenidConnect'

describe("OIDC Actions", () => {

  it("should create an action to trigger fetching a qrcode", () => {
    const expectedAction = {
      type: "POST_OPENID"
    };
    expect(actions.postOpenid()).toEqual(expectedAction);
  });

  it("should create an action to signal an error fetching a qrcode", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: "POST_OPENID_FAIL",
      error: true,
      payload: err
    };
    expect(actions.postOpenidFail(err)).toEqual(expectedAction);
  });
});


const middlewares = [ thunkMiddleware ];
const mockStore = configureStore(middlewares);

describe("Async Actions", () => {

  afterEach(() => {
    fetchMock.restore()
  });

  it("Fetch qrcode and dispatch action with result", (done) => {

    fetchMock.post('http://localhost/oidc',
       {
        type: actions.POST_OPENID_SUCCESS,
        payload: {qrcode: 'new code'}
      });

    const expectedActions = [
      {type: actions.POST_OPENID},
      {type: actions.POST_OPENID_SUCCESS, payload: {qrcode: 'new code'}}
    ];

    const store = mockStore({
      config: {OIDC_PROOFING_URL: 'http://localhost/oidc'},
      openid_data: {qrcode: 'old code'}
    });

    store.dispatch(actions.fetchOpenidQRCode())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it("Try to fetch qrcode but find server error", (done) => {

    fetchMock.post('http://localhost/oidc', 500);

    const expectedActions = [
      {type: actions.POST_OPENID},
      {
        type: actions.POST_OPENID_FAIL,
        error: true,
        payload: new Error('Internal Server Error')
      }
    ];

    const store = mockStore({
      config: {OIDC_PROOFING_URL: 'http://localhost/oidc'},
      openid_data: {qrcode: 'old code'}
    });

    store.dispatch(actions.fetchOpenidQRCode())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it("Try to fetch qrcode but server returns error", (done) => {

    const errorResponse = {
        type: actions.POST_OPENID_FAIL,
        error: true,
        payload: 'Terrible Error'
      };

    fetchMock.post('http://localhost/oidc', errorResponse);

    const expectedActions = [
      {type: actions.POST_OPENID},
      errorResponse
    ];

    const store = mockStore({
      config: {OIDC_PROOFING_URL: 'http://localhost/oidc'},
      openid_data: {qrcode: 'old code'}
    });

    store.dispatch(actions.fetchOpenidQRCode())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});


describe("Reducers", () => {

  const mockState = {
    is_fetching: false,
    failed: false,
    qrcode: "code"
  };

  it("Receives a POST_OPENID action", () => {
    expect(
      openidConnectReducer(
        mockState,
        {
          type: actions.POST_OPENID
        }
      )
    ).toEqual(
      {
        qrcode: "code",
        is_fetching: true,
        failed: false
      }
    );
  });

  it("Receives a POST_OPENID_SUCCESS action", () => {
    expect(
      openidConnectReducer(
        mockState,
        {
          type: actions.POST_OPENID_SUCCESS,
          payload: { qrcode: 'new code' }
        }
      )
    ).toEqual(
      {
        qrcode: "new code",
        is_fetching: false,
        failed: false
      }
    );
  });

  it("Receives a POST_OPENID_FAIL action", () => {
    expect(
      openidConnectReducer(
        mockState,
        {
          type: actions.POST_OPENID_FAIL,
          error: true,
          payload: "Bad error"
        }
      )
    ).toEqual(
      {
        qrcode: "code",
        is_fetching: false,
        failed: true
      }
    );
  });

  it("Receives a DUMMY action", () => {
    expect(
      openidConnectReducer(
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
        qrcode: "code",
      }
    );
  });
});


function setupComponent() {
  const props = {
    handleGetQRCode: createSpy(),
    qrcode: 'code'
  }

  const wrapper = shallow(<OpenidConnect {...props} />)

  return {
    props,
    wrapper
  }
}

describe("OpenidConnect Component", () => {

  it("Renders", () => {
    const { wrapper, props } = setupComponent(),
          form = wrapper.find('form'),
          fieldset = wrapper.find('fieldset'),
          button = wrapper.find('Button'),
          divQrcode = wrapper.find('div#qrcode'),
          img = wrapper.find('img');

    expect(form.hasClass('form-horizontal')).toBeTruthy();
    expect(form.contains(fieldset.get(0))).toBeTruthy();
    expect(fieldset.contains(button.get(0))).toBeTruthy();
    expect(divQrcode.contains(img.get(0))).toBeTruthy();

    expect(form.props()).toContain({role: 'form'});
    expect(fieldset.props()).toContain({id: 'openid-connect'});
    expect(img.props()).toContain({src: 'code'});

    expect(props.handleGetQRCode.calls.length).toEqual(0);
    button.props().onClick();
    expect(props.handleGetQRCode.calls.length).toEqual(1);
  });
});

import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import OpenidConnectContainer from "containers/OpenidConnect";

const messages = require('../../i18n/l10n/en')
addLocaleData('react-intl/locale-data/en');


const fakeStore = (state) => ({
  default: () => {},
  dispatch: createSpy(),
  subscribe: createSpy(),
  getState: () => ({ ...state })
});

describe("OpenidConnect Container", () => {
  let fulltext;
  let qrcode;
  let mockProps;
  let wrapper;

  beforeEach(() => {
    const store = fakeStore({
      openid_data: {
        is_fetching: false,
        failed: false,
        qrcode: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      }
    });

    mockProps = {
      qrcode: 'data: old code',
      handleGetQRCode: createSpy()
    };

    wrapper = mount(
        <IntlProvider locale={'en'} messages={messages}>
          <Provider store={store}>
            <OpenidConnectContainer {...mockProps}/>
          </Provider>
        </IntlProvider>
    );

    fulltext = wrapper.find(OpenidConnectContainer).text();
    qrcode = wrapper.find('img').props().src;
  });

  it("Renders", () => {
    expect(qrcode).toEqual('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
  });

  it("Clicks", () => {
    expect(mockProps.handleGetQRCode.calls.length).toEqual(0);
    wrapper.find('Button').props().onClick();
    expect(mockProps.handleGetQRCode.calls.length).toEqual(0);
  });

});
