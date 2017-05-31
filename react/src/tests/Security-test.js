
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { put, select, call } from "redux-saga/effects";
import expect, { createSpy, spyOn, isSpy } from "expect";
import Security from 'components/Security';
import * as actions from "actions/Security";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import securityReducer from "reducers/Security";

import { requestCredentials, fetchCredentials,
  requestPasswordChange, postDeleteAccount, deleteAccount } from 'sagas/Security';

import { IntlProvider, addLocaleData } from 'react-intl';

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


describe("Security Actions", () => {
   it("Should get the credentials ", () => {
       const expectedAction = {
           type: actions.GET_CREDENTIALS
       };
       expect(actions.getCredentials()).toEqual(expectedAction);
   });

   it("Should fail when trying to get the credentials", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.GET_CREDENTIALS_FAIL,
      error: true,
      payload: {
        error: new Error(err),
        message: err
      }
    };
    expect(actions.getCredentialsFail(err)).toEqual(expectedAction);
  });

  it("Should start password change ", () => {
     const expectedAction = {
         type: actions.START_CHANGE_PASSWORD
     };
     expect(actions.startConfirmationPassword()).toEqual(expectedAction);
  });

  it("Should stop password change ", () => {
     const expectedAction = {
         type: actions.STOP_CHANGE_PASSWORD
     };
     expect(actions.stopConfirmationPassword()).toEqual(expectedAction);
  });

  it("Should really start password change ", () => {
     const expectedAction = {
         type: actions.GET_CHANGE_PASSWORD
     };
     expect(actions.confirmPasswordChange()).toEqual(expectedAction);
  });

  it("Should fail when trying to change password", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.GET_CHANGE_PASSWORD_FAIL,
      error: true,
      payload: {
        error: new Error(err),
        message: err
      }
    };
    expect(actions.getPasswordChangeFail(err)).toEqual(expectedAction);
  });

  it("Should start account deletion", () => {
     const expectedAction = {
         type: actions.START_DELETE_ACCOUNT
     };
     expect(actions.startConfirmationDeletion()).toEqual(expectedAction);
  });

  it("Should stop account deletion", () => {
     const expectedAction = {
         type: actions.STOP_DELETE_ACCOUNT
     };
     expect(actions.stopConfirmationDeletion()).toEqual(expectedAction);
  });

  it("Should start confirmed account deletion", () => {
     const expectedAction = {
         type: actions.POST_DELETE_ACCOUNT
     };
     expect(actions.confirmDeletion()).toEqual(expectedAction);
  });

  it("Should POST confirmed account deletion", () => {
     const expectedAction = {
         type: actions.SEND_POST_DELETE_ACCOUNT
     };
     expect(actions.postConfirmDeletion()).toEqual(expectedAction);
  });

  it("Should signal failure when trying to remove the account", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.POST_DELETE_ACCOUNT_FAIL,
      error: true,
      payload: {
        error: new Error(err),
        message: err
      }
    };
    expect(actions.removeAccountFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {

  const mockState = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    csrf_token: '',
    credentials: [],
    code: '',
    confirming_change: false,
    confirming_deletion: false,
    location: ''
  };

  it("Receives a GET_CREDENTIALS action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_CREDENTIALS
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: ''
      }
    );
  });

  it("Receives a GET_CREDENTIALS_SUCCESS action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_CREDENTIALS_SUCCESS
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: ''
      }
    );
  });

  it("Receives a GET_CREDENTIALS_FAIL action", () => {
    const err = 'Error',
          error = new Error(err);
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_CREDENTIALS_FAIL,
          error: true,
          payload: {
            error: error,
            message: err
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: error,
        message: err,
        csrf_token: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: ''
      }
    );
  });

  it("Receives a START_CHANGE_PASSWORD action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.START_CHANGE_PASSWORD
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        credentials: [],
        code: '',
        confirming_change: true,
        confirming_deletion: false,
        location: ''
      }
    );
  });

  it("Receives a STOP_CHANGE_PASSWORD action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.STOP_CHANGE_PASSWORD
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: ''
      }
    );
  });

  it("Receives a GET_CHANGE_PASSWORD action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_CHANGE_PASSWORD
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: ''
      }
    );
  });

  it("Receives a GET_CHANGE_PASSWORD_FAIL action", () => {
    const err = 'Error',
          error = new Error(err);
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_CHANGE_PASSWORD_FAIL,
          error: true,
          payload: {
            error: error,
            message: err
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: error,
        message: err,
        csrf_token: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: ''
      }
    );
  });

  it("Receives a START_DELETE_ACCOUNT action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.START_DELETE_ACCOUNT
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: true,
        location: ''
      }
    );
  });

  it("Receives a STOP_DELETE_ACCOUNT action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.STOP_DELETE_ACCOUNT
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: ''
      }
    );
  });

  it("Receives a POST_DELETE_ACCOUNT action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.POST_DELETE_ACCOUNT
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: ''
      }
    );
  });

  it("Receives a POST_DELETE_ACCOUNT action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.POST_DELETE_ACCOUNT
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: ''
      }
    );
  });

  it("Receives a POST_DELETE_ACCOUNT_SUCCESS action", () => {
    const location = 'dummy-location';
    expect(
      securityReducer(
        mockState,
        {
          type: actions.POST_DELETE_ACCOUNT_SUCCESS,
          payload: {
            location: location
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: location
      }
    );
  });

  it("Receives a POST_DELETE_ACCOUNT_FAIL action", () => {
    const err = 'Error',
          error = new Error(err);
    expect(
      securityReducer(
        mockState,
        {
          type: actions.POST_DELETE_ACCOUNT_FAIL,
          error: true,
          payload: {
            error: error,
            message: err
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: error,
        message: err,
        csrf_token: '',
        credentials: [],
        code: '',
        confirming_change: false,
        confirming_deletion: false,
        location: ''
      }
    );
  });
});

const mockState = {
  security: {
    location: 'dummy-location',
    csrf_token: 'csrf-token'
  },
  config: { SECURITY_URL: 'dummy-url'}
};

describe("Async component", () => {

  it("Sagas requestCredentials", () => {

    const generator = requestCredentials();

    let next = generator.next();
    expect(next.value).toEqual(put(actions.getCredentials()));

    next = generator.next();
    const config = state => state.config;
    const credentials = generator.next(config);
    expect(credentials.value).toEqual(call(fetchCredentials,config));

    const mockCredentials = {
      csrf_token: 'csrf-token',
      payload: {
        csrf_token: 'csrf-token',
        credentials: [
          {
            credential_type: 'password',
            created_ts: '',
            success_ts: ''
          }
        ]
      }
    };
    next = generator.next(mockCredentials);
    expect(next.value).toEqual(put(mockCredentials));
  });

  it("Sagas requestPasswordChange", () => {

    const generator = requestPasswordChange();

    let next = generator.next();
    expect(next.value).toEqual(put(actions.stopConfirmationPassword()));

    window.onbeforeunload = createSpy();
    next = generator.next();
    const config = state => state.config;
    generator.next(mockState.config);
    expect(window.location.href).toEqual('http://localhost:9876/context.html');
  });

  it("Sagas postDeleteAccount", () => {

    const generator = postDeleteAccount();
    let next = generator.next();
    expect(next.value).toEqual(put(actions.postConfirmDeletion()));

    const get_state = state => state;
    const state = generator.next(get_state);

    const data = {
        csrf_token: 'csrf-token'
    };

    const resp = generator.next(call(deleteAccount, state.config, data));
    expect(resp.value).toEqual('hoooo');

    const end = generator.next();
    expect(end.value).toEqual(put(resp));
  });

});
