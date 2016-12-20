
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetch from "whatwg-fetch";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import * as actions from "actions/OpenidConnect";
import openidConnectReducer from "reducers/OpenidConnect";
import OpenidConnect from 'components/OpenidConnect'

describe("OIDC Actions", () => {

  it("should create an action to trigger fetching a qrcode", () => {
    const expectedAction = {
      type: actions.POST_OIDC_PROOFING_PROOFING
    };
    expect(actions.postOpenid()).toEqual(expectedAction);
  });

  it("should create an action to signal an error fetching a qrcode", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.POST_OIDC_PROOFING_PROOFING_FAIL,
      error: true,
      payload: {
        error: 'Bad error',
        message: 'Bad error'
      }
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
        type: actions.POST_OIDC_PROOFING_PROOFING_SUCCESS,
        payload: {qr_img: 'new code', qr_code: 'new nonce'}
      });

    const expectedActions = [
      {type: actions.POST_OIDC_PROOFING_PROOFING},
      {type: actions.POST_OIDC_PROOFING_PROOFING_SUCCESS,
       payload: {
        qr_img: 'new code',
        qr_code: 'new nonce'
       }
      }
    ];

    const store = mockStore({
      config: {OIDC_PROOFING_URL: 'http://localhost/oidc'},
      openid_data: {qr_img: 'old code', qr_code: 'old nonce'}
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
      {type: actions.POST_OIDC_PROOFING_PROOFING},
      {
        type: actions.POST_OIDC_PROOFING_PROOFING_FAIL,
        error: true,
        payload: {
          error: 'Error: Internal Server Error',
          message: 'Error: Internal Server Error'
        }
      }
    ];

    const store = mockStore({
      config: {OIDC_PROOFING_URL: 'http://localhost/oidc'},
      openid_data: {qr_img: 'old code', qr_code: 'old nonce'}
    });

    store.dispatch(actions.fetchOpenidQRCode())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it("Try to fetch qrcode but server returns error", (done) => {

    const errorResponse = {
        type: actions.POST_OIDC_PROOFING_PROOFING_FAIL,
        error: true,
        payload: {
          error: 'Terrible Error',
          message: 'Terrible Error'
        }
      };

    fetchMock.post('http://localhost/oidc', errorResponse);

    const expectedActions = [
      {type: actions.POST_OIDC_PROOFING_PROOFING},
      errorResponse
    ];

    const store = mockStore({
      config: {OIDC_PROOFING_URL: 'http://localhost/oidc'},
      openid_data: {qr_img: 'old code', qr_code: 'old nonce'}
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
    qr_img: "code",
    qr_code: 'nonce'
  };

  it("Receives a POST_OIDC_PROOFING_PROOFING action", () => {
    expect(
      openidConnectReducer(
        mockState,
        {
          type: actions.POST_OIDC_PROOFING_PROOFING
        }
      )
    ).toEqual(
      {
        qr_img: "code",
        qr_code: "nonce",
        is_fetching: true,
        failed: false
      }
    );
  });

  it("Receives a POST_OIDC_PROOFING_PROOFING_SUCCESS action", () => {
    expect(
      openidConnectReducer(
        mockState,
        {
          type: actions.POST_OIDC_PROOFING_PROOFING_SUCCESS,
          payload: { qr_img: 'new code', qr_code: 'new nonce' }
        }
      )
    ).toEqual(
      {
        qr_img: "new code",
        qr_code: "new nonce",
        is_fetching: false,
        failed: false
      }
    );
  });

  it("Receives a POST_OIDC_PROOFING_PROOFING_FAIL action", () => {
    expect(
      openidConnectReducer(
        mockState,
        {
          type: actions.POST_OIDC_PROOFING_PROOFING_FAIL,
          error: true,
          payload: {
            error: "Bad error",
            message: "Bad error"
          }
        }
      )
    ).toEqual(
      {
        qr_img: "code",
        qr_code: "nonce",
        is_fetching: false,
        failed: true,
        error: "Bad error"
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
        qr_img: "code",
        qr_code: "nonce"
      }
    );
  });
});


function setupComponent() {
  const props = {
    handleGetQRCode: createSpy(),
    qr_img: 'code',
    qr_code: 'nonce'
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
          button = wrapper.find('EduIDButton'),
          divQrcode = wrapper.find('div#qrcode'),
          img = wrapper.find('img'),
          caption = wrapper.find('figcaption');

    expect(form.hasClass('form-horizontal')).toBeTruthy();
    expect(form.contains(fieldset.get(0))).toBeTruthy();
    expect(fieldset.contains(button.get(0))).toBeTruthy();
    expect(divQrcode.contains(img.get(0))).toBeTruthy();

    expect(form.props()).toContain({role: 'form'});
    expect(fieldset.props()).toContain({id: 'openid-connect'});
    expect(img.props()).toContain({src: 'code'});
    expect(caption).toBeTruthy();

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
  let fulltext,
      qrcode,
      nonce,
      mockProps,
      wrapper,
      dispatch;

  beforeEach(() => {
    const store = fakeStore({
      openid_data: {
        is_fetching: false,
        failed: false,
        qr_img: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        qr_code: 'new nonce'
      },
      config: {OIDC_PROOFING_URL: 'http://localhost/oidc'},
    });

    mockProps = {
      qr_img: 'data: old code',
      qr_code: 'old nonce'
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
    nonce = wrapper.find('figcaption').text();
    dispatch = store.dispatch;
  });


  afterEach(() => {
    fetchMock.restore()
  });

  it("Renders", () => {
    expect(qrcode).toEqual('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    expect(nonce).toEqual('new nonce');
  });

  it("Clicks", () => {

    fetchMock.post('http://localhost/oidc',
       {
        type: actions.POST_OIDC_PROOFING_PROOFING_SUCCESS,
        payload: {qr_img: 'new code', qr_code: 'new nonce'}
      });

    expect(dispatch.calls.length).toEqual(0);
    wrapper.find('Button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
  });

});
