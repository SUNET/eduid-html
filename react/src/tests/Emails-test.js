import React from 'react';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from "expect";
import Emails from 'components/Emails';
import * as actions from "actions/Emails";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import emailsReducer from "reducers/Emails";

import EmailsContainer from "containers/Emails";
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';

import { requestEmails, fetchEmails, requestResend, requestResendEmailCode, saveEmail, sendEmail,
         requestVerifyEmail, requestVerify, requestRemoveEmail, requestRemove, requestMakePrimaryEmail,
         requestMakePrimary } from 'sagas/Emails';
import { put, call, select } from "redux-saga/effects";

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


describe("Email Actions", () => {
   it("Should get the emails ", () => {
       const expectedAction = {
           type: actions.GET_EMAILS
       };
       expect(actions.getEmails()).toEqual(expectedAction);
   });

   it("Should fail when trying to get the emails", () => {
    const err = 'Bad error';
    const expectedAction = {
      type: actions.GET_EMAILS_FAIL,
      error: true,
      payload: new Error(err)
    };
    expect(actions.getEmailsFail(err)).toEqual(expectedAction);
  });

    it("Should change the emails ", () => {
       const data = {
           'email': 'test@localhost.com',
           'text': 'texting'
       };
       const expectedAction = {
           type: actions.CHANGE_EMAIL,
           payload: data
       };
       expect(actions.changeEmail(data)).toEqual(expectedAction);
   });

   it("Should post the emails ", () => {
       const expectedAction = {
           type: actions.POST_EMAIL
       };
       expect(actions.postEmail()).toEqual(expectedAction);
   });

   it("Should fail when trying to post the emails", () => {
        const err = 'Bad error';
        const expectedAction = {
          type: actions.POST_EMAIL_FAIL,
          error: true,
          payload: new Error(err)
        };
        expect(actions.postEmailFail(err)).toEqual(expectedAction);
    });

    it("Should start the confirmation ", () => {
       const data = {
           'email': 'test@localhost.com',
           'text': 'texting'
       };
       const expectedAction = {
           type: actions.START_CONFIRMATION,
           payload: data
       };
       expect(actions.startConfirmation(data)).toEqual(expectedAction);
   });

   it("Should stop the confirmation ", () => {
       const expectedAction = {
           type: actions.STOP_CONFIRMATION,
       };
       expect(actions.stopConfirmation()).toEqual(expectedAction);
   });

   it("Should resend the email code ", () => {
       const expectedAction = {
           type: actions.START_RESEND_EMAIL_CODE,
       };
       expect(actions.startResendEmailCode()).toEqual(expectedAction);
   });

   it("Should fail when resend the email code ", () => {
        const err = 'Bad error';
        const expectedAction = {
          type: actions.START_RESEND_EMAIL_CODE_FAIL,
          error: true,
          payload: new Error(err)
        };
        expect(actions.resendEmailCodeFail(err)).toEqual(expectedAction);
   });

  it("Should start the verify process", () => {
      const data = {
          email: "john@gmail.com",
          identifier: "1"
      };
       const expectedAction = {
           type: actions.START_VERIFY,
           payload: data
       };

       expect(actions.startVerify(data)).toEqual(expectedAction);
   });

   it("Should fail when start the verify process ", () => {
        const err = 'Bad error';
        const expectedAction = {
          type: actions.START_VERIFY_FAIL,
          error: true,
          payload: new Error(err)
        };
        expect(actions.startVerifyFail(err)).toEqual(expectedAction);
   });

    it("Should start remove process ", () => {
        const data = {
          email: "john@gmail.com",
          identifier: "1"
        };
        const expectedAction = {
          type: actions.POST_EMAIL_REMOVE,
          payload: data
        };
        expect(actions.startRemove(data)).toEqual(expectedAction);
   });

    it("Should fail when start the remove process ", () => {
        const err = 'Bad error';
        const expectedAction = {
          type: actions.POST_EMAIL_REMOVE_FAIL,
          error: true,
          payload: new Error(err)
        };
        expect(actions.startRemoveFail(err)).toEqual(expectedAction);
   });

    it("Should start the make primary process", () => {
        const data = {
          email: "john@gmail.com",
          identifier: "1"
        };
        const expectedAction = {
          type: actions.POST_EMAIL_PRIMARY,
          payload: data
        };
        expect(actions.makePrimary(data)).toEqual(expectedAction);
   });

    it("Should fail when start the primary process ", () => {
        const err = 'Bad error';
        const expectedAction = {
          type: actions.POST_EMAIL_PRIMARY_FAIL,
          error: true,
          payload: new Error(err)
        };
        expect(actions.makePrimaryFail(err)).toEqual(expectedAction);
   });

});

describe("Reducers", () => {

  const mockState = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    resending: {
      is_fetching: false,
      failed: false,
      error: {},
      message: ''
    },
    confirming: '',
    emails: [],
    email: '',
};

    it("Receives a GET_EMAILS action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.GET_EMAILS,
          is_fetching: true
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: '',
      }
    );
  });


    it("Receives a GET_EMAILS_SUCCESS action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.GET_EMAILS_SUCCESS,
          payload:{
            email:'johnsmith@example.com'
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email:'johnsmith@example.com',
      }
    );
  });

    it("Receives a GET_EMAILS_FAIL action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.GET_EMAILS_FAIL,
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: '',
      }
    );
  });

   it("Receives a CHANGE_EMAIL action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.CHANGE_EMAIL,
          payload:{
              email:'johnsmith@example.com'
          }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: 'johnsmith@example.com',
      }
    );
  });

   it("Receives a POST_EMAIL action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.POST_EMAIL,
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: '',
      }
    );
  });

    it("Receives a POST_EMAIL_SUCCESS action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.POST_EMAIL_SUCCESS,
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: '',
      }
    );
  });

    it("Receives a POST_EMAIL_FAIL action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.POST_EMAIL_FAIL,
            payload: {
                error: {error: "Bad error"},
            }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: {error:"Bad error"},
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: '',
      }
    );
  });

    it("Receives a START_CONFIRMATION action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.START_CONFIRMATION,
          payload: {
              email: "test@localhost.com",
         }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: 'test@localhost.com',
        emails: [],
        email: '',
      }
    );
  });

    it("Receives a STOP_CONFIRMATION action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.STOP_CONFIRMATION,
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: '',
      }
    );
  });

    it("Receives a START_RESEND_EMAIL_CODE action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.START_RESEND_EMAIL_CODE,
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: true,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: '',
      }
    );
  });

it("Receives a START_RESEND_EMAIL_CODE_SUCCESS action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.START_RESEND_EMAIL_CODE_SUCCESS,
            message: 'emails.resend_success'
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: 'emails.resend_success'
        },
        confirming: '',
        emails: [],
        email: '',
      }
    );
  });

it("Receives a START_RESEND_EMAIL_CODE_FAIL action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.START_RESEND_EMAIL_CODE_FAIL,
           payload: {
              error: {error:"Bad error"},
         }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: true,
          error: {error:"Bad error"},
          message: ''
        },
        confirming: '',
        emails: [],
        email: '',
      }
    );
  });

 it("Receives a START_VERIFY action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.START_VERIFY,
          payload: {
              code: '123456789',
          }
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: '',
        code: '123456789',
      }
    );
  });

it("Receives a START_VERIFY_FAIL action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.START_VERIFY_FAIL,
           payload: {
              error: {error:"Bad error"},
         }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: {error:"Bad error"},
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: '',
      }
    );
  });

 it("Receives a POST_EMAIL_REMOVE_CODE action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.POST_EMAIL_REMOVE,
          payload:{
              email: 'john@gmail.com'
          }
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: 'john@gmail.com',
      }
    );
  });

it("Receives a POST_EMAIL_REMOVE_SUCCESS action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.POST_EMAIL_REMOVE_SUCCESS,
            message: 'emails.resend_success'
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: '',
      }
    );
  });

it("Receives a POST_EMAIL_REMOVE_FAIL action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.POST_EMAIL_REMOVE_FAIL,
           payload: {
              error: {error:"Bad error"},
         }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: {error:"Bad error"},
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: '',
      }
    );
  });


 it("Receives a POST_EMAIL_PRIMARY action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.POST_EMAIL_PRIMARY,
          payload:{
              email: 'john@gmail.com'
          }
        }
      )
    ).toEqual(
      {
        is_fetching: true,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: 'john@gmail.com',
      }
    );
  });

it("Receives a POST_EMAIL_PRIMARY_SUCCESS action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.POST_EMAIL_PRIMARY_SUCCESS,
            message: 'emails.resend_success'
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: '',
      }
    );
  });

it("Receives a POST_EMAIL_PRIMARY_FAIL action", () => {
    expect(
      emailsReducer(
        mockState,
        {
          type: actions.POST_EMAIL_PRIMARY_FAIL,
           payload: {
              error: {error:"Bad error"},
         }
        }
      )
    ).toEqual(
      {
        is_fetching: false,
        failed: true,
        error: {error:"Bad error"},
        message: '',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
        confirming: '',
        emails: [],
        email: '',
      }
    );
  });


});

const getState = () => state;
const state = {
    emails: {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        confirming: '',
        emails: [],
        email: '',
        csrf_token: '123456789',
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
    },
    config : {
        EMAILS_URL: 'test/localhost',
        email: 'email@localhost.com',
    }
};


describe("Async component", () => {

    it("Sagas requestEmails", () => {

       const generator = requestEmails();

       let next = generator.next();
       expect(next.value).toEqual(put(actions.getEmails()));

        next = generator.next();

        const mockGetState = function (state) {
            return state.config;
        };

        const config = state => state.config;

        // expect(next.value).toEqual(select(state => state.config));

        const emails = generator.next(config);

        expect(emails.value).toEqual(call(fetchEmails,config));

        const email = 'john@example.com'
        next = generator.next(email);
        expect(next.value).toEqual(put(email));
    });

    it("Sagas saveEmail", () => {

       const generator = saveEmail();
       let next = generator.next();

       // next.value.SELECT.selector = function (state) {
       //      return state;
       // };
       // expect(next.value).toEqual(select(state => state));

       const data = {
                email: state.emails.email,
                verified: false,
                primary: false,
                csrf_token: state.emails.csrf_token
              };

       const emails = generator.next(state);
       expect(emails.value).toEqual(call(sendEmail, state.config, data));

       const email = 'john@example.com'
       next = generator.next(email);
       expect(next.value).toEqual(put(email));
    });

    it("Sagas requestResendEmailCode", () => {

       const generator = requestResendEmailCode(getState);
       let next = generator.next();

       // next.value.SELECT.selector = function (state) {
       //      return state;
       // };
       // expect(next.value).toEqual(select(state => state));

        const data = {
                email: state.emails.confirming,
                csrf_token: state.emails.csrf_token
              };

        const resp = generator.next(state);

        expect(resp.value).toEqual(call(requestResend, state.config, data));

        next = generator.next(resp.value);
        expect(next.value).toEqual(put(resp.value));
    });

    it("Sagas requestVerifyEmail", () => {

       const generator = requestVerifyEmail(getState);
       let next = generator.next();

       // next.value.SELECT.selector = function (state) {
       //      return state;
       // };
       // expect(next.value).toEqual(select(state => state));

        const data = {
                email: state.emails.confirming,
                code: state.emails.code,
                csrf_token: state.emails.csrf_token
              };

        const resp = generator.next(state);

        expect(resp.value).toEqual(call(requestVerify, state.config, data));

        next = generator.next(resp.value);
        expect(next.value).toEqual(put(resp.value));
    });

    it("Sagas requestRemoveEmail", () => {

       const generator = requestRemoveEmail(getState);
       let next = generator.next();

       // next.value.SELECT.selector = function (state) {
       //      return state;
       // };
       // expect(next.value).toEqual(select(state => state));

        const data = {
                email: state.emails.confirming,
                csrf_token: state.emails.csrf_token
              };

        const resp = generator.next(state);

        expect(resp.value).toEqual(call(requestRemove, state.config, data));

        next = generator.next(resp.value);
        expect(next.value).toEqual(put(resp.value));
    });

    it("Sagas requestMakePrimaryEmail", () => {

       const generator = requestMakePrimaryEmail(getState);
       let next = generator.next();

       // next.value.SELECT.selector = function (state) {
       //      return state;
       // };
       // expect(next.value).toEqual(select(state => state));

        const data = {
                email: state.emails.confirming,
                csrf_token: state.emails.csrf_token
              };

        const resp = generator.next(state);

        expect(resp.value).toEqual(call(requestMakePrimary, state.config, data));

        next = generator.next(resp.value);
        expect(next.value).toEqual(put(resp.value));
    });

});

function setupComponent() {
  const props = {
    given_name: '',
    surname: '',
    display_name: '',
    language: '',
    handleSave: createSpy(),
    handleChange: createSpy(),
  };

  const wrapper = shallow(<IntlProvider locale={'en'} messages={messages}>
                             <Emails {...props} />
                          </IntlProvider>)
  return {
    props,
    wrapper,
  }
}

describe("Emails Component", () => {

    it("Renders", () => {
        const {wrapper, props} = setupComponent(),
            form = wrapper.find('form'),
            fieldset = wrapper.find('fieldset'),
            email = wrapper.find('TextControl[name="email"]');
        // TODO: not finished
    });
});


const fakeStore = (state) => ({
  default: () => {},
  dispatch: createSpy(),
  subscribe: createSpy(),
  getState: () => ({ ...state })
});


describe("Emails Container", () => {
  let fulltext,
    email,
    fulldom,
    language,
    mockProps,
    wrapper,
    dispatch;

 beforeEach(() => {
    const store = fakeStore({
        emails: {
            is_fetching: false,
            failed: false,
            error: '',
            message: '',
            resending: {
              is_fetching: false,
              failed: false,
              error: {},
              message: ''
            },
            confirming: '',
            emails: [],
            email: '',
        },
      config: {PERSONAL_DATA_URL: 'http://localhost/services/personal-data/user'},
    });

    mockProps = {
        email: 'test@localhost.com',
        language: 'en'
    };



    wrapper = mount(
        <IntlProvider locale={'en'} messages={messages}>
          <Provider store={store}>
            <EmailsContainer {...mockProps}/>
          </Provider>
        </IntlProvider>
    );
    fulldom = wrapper.find(EmailsContainer);
    fulltext = wrapper.find(EmailsContainer).text();
    email = wrapper.find(EmailsContainer).props().email;
    language = wrapper.find(EmailsContainer).props().language;
    dispatch = store.dispatch;
  });


  afterEach(() => {
    fetchMock.restore()
  });

  it("Renders test", () => {
      expect(language).toEqual('en');
      expect(email).toEqual('test@localhost.com');
  });

  it("Clicks", () => {

    fetchMock.post('http://localhost/profile/email',
       {
        type: actions.POST_EMAIL
      });
    expect(dispatch.calls.length).toEqual(0);
    wrapper.find('#email-button').props().onClick();
    expect(dispatch.calls.length).toEqual(1);
  });

});
