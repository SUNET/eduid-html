
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { put, select, call } from "redux-saga/effects";
import expect, { createSpy, spyOn, isSpy } from "expect";
import ChangePassword from 'components/ChangePassword';
import DeleteModal from 'components/DeleteModal';
import ChangePasswordContainer from 'containers/ChangePassword';
import * as actions from "actions/ChangePassword";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import chpassReducer from "reducers/ChangePassword";
import { Provider } from 'react-redux';

import {  } from 'sagas/ChangePassword';

import { IntlProvider, addLocaleData } from 'react-intl';

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


describe("ChangePassword Actions", () => {

   it("Should get a suggested password", () => {
       const expectedAction = {
           type: actions.GET_SUGGESTED_PASSWORD
       };
       expect(actions.getSuggestedPassword()).toEqual(expectedAction);
   });

   it("Should fail when trying to get a suggested password", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.GET_SUGGESTED_PASSWORD_FAIL,
      error: true,
      payload: {
        error: new Error(err),
        message: err
      }
    };
    expect(actions.getSuggestedPasswordFail(err)).toEqual(expectedAction);
  });

  it("Should choose the suggested password", () => {
     const passwd = '1234',
           expectedAction = {
             type: actions.CHOOSE_SUGGESTED_PASSWORD,
             payload: passwd
           };
     expect(actions.chooseSuggestedPassword(passwd)).toEqual(expectedAction);
  });

  it("Should choose a custom password", () => {
     const expectedAction = {
             type: actions.CHOOSE_CUSTOM_PASSWORD
           };
     expect(actions.chooseCustomPassword(passwd)).toEqual(expectedAction);
  });

  it("Valid custom password", () => {
     const passwd = '1234',
           expectedAction = {
             type: actions.VALID_CUSTOM_PASSWORD,
             payload: passwd
           };
     expect(actions.validCustomPassword()).toEqual(expectedAction);
  });

  it("Action password not ready", () => {
     const err = 'Error',
           expectedAction = {
              type: actions.PASSWORD_NOT_READY,
              error: true,
              payload: {
                error: new Error(err),
                message: err
              }
           };
     expect(actions.passwordNotReady(err)).toEqual(expectedAction);
  });

  it("Post password change (new and old)", () => {
    const passwd1 = '1234',
          passwd2 = '5678',
          expectedAction = {
            type: actions.POST_PASSWORD_CHANGE,
            payload: {
              old: passwd1,
              next: passwd2
            }
          };
    expect(actions.postPasswordChange(passwd1, passwd2)).toEqual(expectedAction);
  });

  it("Should start password change", () => {
     const expectedAction = {
         type: actions.START_PASSWORD_CHANGE
     };
     expect(actions.startPasswordChange()).toEqual(expectedAction);
  });

  it("Fail starting passwd change", () => {
     const err = 'Error',
           expectedAction = {
              type: actions.POST_SECURITY_CHANGE_PASSWORD_FAIL,
              error: true,
              payload: {
                error: new Error(err),
                message: err
              }
           };
     expect(actions.postPasswordChange(err)).toEqual(expectedAction);
  });

});

describe("Reducers", () => {

  const mockState = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    csrf_token: '',
    suggested_password: '',
    old_password: '',
    new_password: '',
    choose_custom: false,
  };

  it("Receives a GET_SUGGESTED_PASSWORD action", () => {
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_SUGGESTED_PASSWORD
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        suggested_password: '',
        old_password: '',
        new_password: '',
        choose_custom: false,
      }
    );
  });

  it("Receives a GET_SUGGESTED_PASSWORD_SUCCESS action", () => {
    const suggested = '2345';
    expect(
      securityReducer(
        mockState,
        {
          type: actions.GET_SUGGESTED_PASSWORD_SUCCESS,
          payload: suggested
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        csrf_token: '',
        suggested_password: suggested,
        old_password: '',
        new_password: '',
        choose_custom: false,
      }
    );
  });









  // por aqui

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
  config: {
    DASHBOARD_URL: '/dummy-dash-url',
    TOKEN_SERVICE_URL: '/dummy-tok-url',
    SECURITY_URL: '/dummy-sec-url'
  }
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

    const oldLoc = window.location.href;
    let mockWindow = {
      location:{
        href: oldLoc
      }
    };

    const generator = requestPasswordChange(mockWindow);

    let next = generator.next();
    expect(next.value).toEqual(put(actions.stopConfirmationPassword()));

    next = generator.next();
    expect(next.value.SELECT.args).toEqual([]);

    generator.next(mockState.config);
    expect(mockWindow.location.href).toEqual('/dummy-tok-url/chpass?next=%2Fdummy-dash-url%2F%23chpass');
  });

  it("Sagas postDeleteAccount", () => {

    const generator = postDeleteAccount();
    let next = generator.next();
    expect(next.value).toEqual(put(actions.postConfirmDeletion()));

    next = generator.next();
    expect(next.value.SELECT.args).toEqual([]);

    const data = {
        csrf_token: 'csrf-token'
    };

    next = generator.next(mockState);
    expect(next.value).toEqual(call(deleteAccount, mockState.config, data));

    const mockAction = {
      type: "POST_SECURITY_TERMINATE_ACCOUNT_SUCCESS"
    };
    const end = generator.next(mockAction);
    expect(end.value).toEqual(put(mockAction));
  });

});


function setupComponent() {
  const props = {
    credentials: [],
    creation_date: '',
    last_used: '',
    language: '',
    langs: [],
    errorMsg: '',
    is_fetching: false,
    confirming_change: false,
    confirming_deletion: false,
    handleStartConfirmationPassword: createSpy(),
    handleStopConfirmationPassword: createSpy(),
    handleConfirmationPassword: createSpy(),
    handleStartConfirmationDeletion: createSpy(),
    handleStopConfirmationDeletion: createSpy(),
    handleConfirmationDeletion: createSpy(),
  };

  const wrapper = shallow(<IntlProvider locale={'en'} messages={messages}>
                             <ChangePassword {...props} />
                          </IntlProvider>)
  return {
    props,
    wrapper,
  }
}

describe("ChangePassword Component", () => {

    it("Renders", () => {
        const {wrapper, props} = setupComponent(),
            table = wrapper.find('table.passwords'),
            buttonChange = wrapper.find('EduIDButton#security-change-button'),
            buttonDelete = wrapper.find('EduIDButton#delete-button'),
            modalChange = wrapper.find('GenericConfirmModal'),
            modalDelete = wrapper.find('DeleteModal');
    });
});


const fakeStore = (state) => ({
  default: () => {},
  dispatch: createSpy(),
  subscribe: createSpy(),
  getState: () => ({ ...state })
});


describe("ChangePassword Container", () => {
  let mockProps,
    fulldom,
    language,
    getWrapper,
    dispatch;

  beforeEach(() => {
    const store = fakeStore({
        security: {
            is_fetching: false,
            failed: false,
            error: '',
            message: '',
            csrf_token: '',
            credentials: [],
            code: '',
            confirming_change: false,
            confirming_deletion: false,
            location: '',
        },
      config: {
        SECURITY_URL: '/dummy-sec-url',
        DASHBOARD_URL: '/dummy-dash-url',
        TOKEN_SERVICE_URL: '/dummy-tok-url'
      },
    });

    mockProps = {
        credentials: [],
        language: 'en'
    };

    getWrapper = function (props=mockProps) {
      const wrapper = mount(
          <IntlProvider locale={'en'} messages={messages}>
            <Provider store={store}>
              <SecurityContainer {...props}/>
            </Provider>
          </IntlProvider>
      );
      return wrapper;
    };
    fulldom = getWrapper().find(SecurityContainer);
    language = getWrapper().find(SecurityContainer).props().language;
    dispatch = store.dispatch;
  });


  afterEach(() => {
    fetchMock.restore()
  });

  it("Renders test", () => {
      expect(language).toEqual('en');
  });

  it("Clicks change", () => {

    expect(dispatch.calls.length).toEqual(0);
    getWrapper().find('#security-change-button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
  });

  it("Clicks delete", () => {

    expect(dispatch.calls.length).toEqual(0);
    getWrapper().find('#delete-button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
  });

  it("Clicks confirm delete", () => {

    fetchMock.post('/dummy-sec-url',
       {
        type: actions.POST_DELETE_ACCOUNT
      });

    const newProps = {
        credentials: [],
        language: 'en',
        handleConfirmationDeletion: createSpy(),
        confirming_deletion: true
    };

    expect(dispatch.calls.length).toEqual(0);
    expect(newProps.handleConfirmationDeletion.calls.length).toEqual(0);
    const modal = getWrapper(newProps).find('DeleteModal'),
          wrapped = modal.node,
          mountedModal = mount(<IntlProvider locale={'en'} messages={messages}>
                                   <DeleteModal {...wrapped.props} />
                               </IntlProvider>);
    
    debugger;
    mountedModal.find('#confirm-delete-account-button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
    expect(newProps.handleConfirmationDeletion.calls.length).toEqual(1);
  });
});

