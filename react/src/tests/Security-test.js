
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { put, select, call } from "redux-saga/effects";
import expect, { createSpy, spyOn, isSpy } from "expect";
import Security from 'components/Security';
import DeleteModal from 'components/DeleteModal';
import SecurityContainer from 'containers/Security';
import * as actions from "actions/Security";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import securityReducer from "reducers/Security";
import { Provider } from 'react-redux';

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
                             <Security {...props} />
                          </IntlProvider>)
  return {
    props,
    wrapper,
  }
}

describe("Security Component", () => {

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


describe("Security Container", () => {
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
    
    mountedModal.find('#confirm-delete-account-button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
    expect(newProps.handleConfirmationDeletion.calls.length).toEqual(1);
  });
});
