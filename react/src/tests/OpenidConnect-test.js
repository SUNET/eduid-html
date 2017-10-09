
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetch from "whatwg-fetch";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import * as actions from "actions/OpenidConnect";
import openidConnectReducer from "reducers/OpenidConnect";
import OpenidConnect from 'components/OpenidConnect'

import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import OpenidConnectContainer from "containers/OpenidConnect";

const messages = require('../../i18n/l10n/en')
addLocaleData('react-intl/locale-data/en');



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
  };

  const wrapper = mount(<IntlProvider locale={'en'} messages={messages}>
                              <OpenidConnect {...props} />
                          </IntlProvider>);

  return {
    props,
    wrapper
  };
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
  })
});


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


const state = {
config : {
    OIDC_PROOFING_URL: 'http://localhost/services/personal-data/user'
}
};

import {requestOpenidQRcode, fetchQRcode} from '../sagas/OpenidConnect';
import { put, call, select } from "redux-saga/effects";

describe("Async component", () => {

  it("Sagas requestOpenidQRcode", () => {

    const generator = requestOpenidQRcode();

    let next = generator.next();
    let debug = select(state => state.config.OIDC_PROOFING_URL);
    // WE need modfied the following selector due a problems with indent.
    // The test fails if we dont do that, previous selector:
    // function (state) {
    //                     return state.config.OIDC_PROOFING_URL;
    //                 }
    next.value.SELECT.selector = function (state) {
      return state.config.OIDC_PROOFING_URL;
    }

    expect(next.value).toEqual(debug);

    const oidcData = generator.next(next.value);
    const data = {
      'nin': 'testing'
    };
    expect(oidcData.value).toEqual(call(fetchQRcode, debug, data));

    const action = {
      type: actions.POST_OIDC_PROOFING_PROOFING_SUCCESS,
      payload: {
        qr_img: 'new code',
        qr_code: 'new nonce',
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

