import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import { put, call, select } from "redux-saga/effects";
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';

import Nins from 'components/Nins';
import NinsContainer from "containers/Nins";
import * as actions from "actions/Nins";
import ninsReducer from "reducers/Nins";
import * as sagas from 'sagas/Nins';


describe("Nin Actions", () => {
   it("Should get the nins ", () => {
       const expectedAction = {
           type: actions.GET_NINS
       };
       expect(actions.getNins()).toEqual(expectedAction);
   });

   it("Should fail when trying to get the nins", () => {
     const err = new Error('Nin error');
     const expectedAction = {
       type: actions.GET_NINS_FAIL,
       error: true,
       payload: {
         error: err,
         message: err.toString()
       }
     };
     expect(actions.getNinsFail(err)).toEqual(expectedAction);
   });

   it("Should signal a valid nin", () => {
     const nin = 'dummy-nin';
     const expectedAction = {
       type: actions.VALID_NIN,
       payload: {
         nin: nin
       }
     };
     expect(actions.validNin(nin)).toEqual(expectedAction);
   });

   it("Should signal an invalid nin", () => {
     const expectedAction = {
       type: actions.INVALID_NIN
     };
     expect(actions.invalidNin()).toEqual(expectedAction);
   });

   it("Should remove nin", () => {
     const nin = 'dummy-nin';
     const expectedAction = {
       type: actions.POST_NIN_REMOVE,
       payload: {
         nin: nin
       }
     };
     expect(actions.startRemove(nin)).toEqual(expectedAction);
   });

   it("Should fail when trying to remove a nin", () => {
     const err = new Error('Nin removal error');
     const expectedAction = {
       type: actions.POST_NIN_REMOVE_FAIL,
       error: true,
       payload: {
         error: err,
         message: err.toString()
       }
     };
     expect(actions.startRemoveFail(err)).toEqual(expectedAction);
   });
});




describe("Reducers", () => {

  const mockState = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    nins: [],
    nin: '',
    rmNin: '',
    valid_nin: true
  };

  it("Receives a GET_NINS action", () => {
    expect(
      ninsReducer(
        mockState,
        {
          type: actions.GET_NINS
        }
      )
    ).toEqual(
      {
        ...mockState,
        is_fetching: true
      }
    );
  });

  it("Receives a GET_NINS_SUCCESS action", () => {
    const nins = [{number: 'nin-number'}];
    expect(
      ninsReducer(
        mockState,
        {
          type: actions.GET_NINS_SUCCESS,
          payload: {
            nins: nins
          }
        }
      )
    ).toEqual(
      {
        ...mockState,
        nins: nins,
        nin: 'nin-number'
      }
    );
  });

  it("Receives a GET_NINS_FAIL action", () => {
    const err = new Error('get nins error');
    expect(
      ninsReducer(
        mockState,
        {
          type: actions.GET_NINS_FAIL,
          error: true,
          payload: {
            error: err,
            message: err.toString()
          }
        }
      )
    ).toEqual(
      {
        ...mockState,
        failed: true,
        error: err,
        message: err.toString()
      }
    );
  });

  it("Receives a VALID_NIN action", () => {
    const nin = 'valid-nin';
    expect(
      ninsReducer(
        mockState,
        {
          type: actions.VALID_NIN,
          payload: {
            nin: nin
          }
        }
      )
    ).toEqual(
      {
        ...mockState,
        nin: nin
      }
    );
  });

  it("Receives an INVALID_NIN action", () => {
    expect(
      ninsReducer(
        mockState,
        {
          type: actions.INVALID_NIN,
        }
      )
    ).toEqual(
      {
        ...mockState,
        valid_nin: false
      }
    );
  });

  it("Receives a POST_NIN_REMOVE action", () => {
    const nin = 'valid-nin';
    expect(
      ninsReducer(
        mockState,
        {
          type: actions.POST_NIN_REMOVE,
          payload: {
            nin: nin
          }
        }
      )
    ).toEqual(
      {
        ...mockState,
        is_fetching: true,
        rmNin: nin
      }
    );
  });

  it("Receives a POST_NIN_REMOVE_SUCCESS action", () => {
    const nins = [{number: 'valid-nin'}];
    expect(
      ninsReducer(
        mockState,
        {
          type: actions.POST_NIN_REMOVE_SUCCESS,
          payload: {
            nins: nins
          }
        }
      )
    ).toEqual(
      {
        ...mockState,
        nins: nins
      }
    );
  });

  it("Receives a POST_NIN_REMOVE_FAIL action", () => {
    const err = new Error('rm nin error');
    expect(
      ninsReducer(
        mockState,
        {
          type: actions.POST_NIN_REMOVE_FAIL,
          error: true,
          payload: {
            error: err,
            message: err.toString()
          }
        }
      )
    ).toEqual(
      {
        ...mockState,
        failed: true,
        error: err
      }
    );
  });
});


const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');

function setupComponent() {
  const props = {
    nins: [],
    nin: '',
    valid_nin: true,
    proofing_methods: [],
    validateNin: createSpy(),
    handleChange: createSpy(),
    handleDelete: createSpy()
  };

  const wrapper = mount(<IntlProvider locale={'en'} messages={messages}>
                              <Nins {...props} />
                          </IntlProvider>);
  return {
    props,
    wrapper
  };
}

describe("Nins Component", () => {

  it("Renders", () => {
    const { wrapper, props } = setupComponent(),
          form = wrapper.find('form'),
          ninInput = wrapper.find("#norEduPersonNin"),
          fieldset = wrapper.find('fieldset');

    expect(form.contains(fieldset.get(0))).toBeTruthy();
    expect(fieldset.hasClass('tabpane')).toBeTruthy();
    expect(fieldset.contains(ninInput.get(0))).toBeTruthy();

    expect(form.props()).toContain({role: 'form'});
    expect(fieldset.props()).toContain({id: 'nins-form'});
  });
});




const fakeStore = (state) => ({
    default: () => {},
    dispatch: createSpy(),
    subscribe: createSpy(),
    getState: () => ({ ...state })
});

describe("Nins Container", () => {
  let mockProps,
    wrapper,
    ninlist,
    dispatch;

  beforeEach(() => {
    const store = fakeStore({
      nins: {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        valid_nin: true,
        nins: [{number: '196701100006', verified: false, primary: false},
               {number: '196701110005', verified: false, primary: false}],
        nin:'',
        rmNin: ''
      },
      config: {
        LETTER_PROOFING_URL: 'http://localhost/services/letter-proofing/',
        PROOFING_METHODS: []
      }
    });

    mockProps = {
      nins: [],
      nin: '',
      valid_nin: true,
      proofing_methods: [],
      is_fetching: false,
      message: ''
    };

    wrapper = mount(
        <IntlProvider locale={'en'} messages={messages}>
          <Provider store={store}>
            <NinsContainer {...mockProps}/>
          </Provider>
        </IntlProvider>
    );
    ninlist = wrapper.find('.nin-holder');
    dispatch = store.dispatch;
  });


  afterEach(() => {
    fetchMock.restore()
  });

  it("Renders", () => {
      expect(ninlist.length).toEqual(2);
  });

  it("Clicks", () => {

    fetchMock.post('http://localhost/services/letter-proofing/remove-nin',
       {
        type: actions.POST_NIN_REMOVE_SUCCESS,
      });
    expect(dispatch.calls.length).toEqual(0);
    wrapper.find('#button-rm-nin-196701100006').simulate('click');
    expect(dispatch.calls.length).toEqual(1);
  });
});

const mockState = {
    config : {
        LETTER_PROOFING_URL: 'http://localhost/services/letter-proofing/',
        PROOFING_METHODS: [],
        csrf_token: 'csrf-token'
    },
    nins: {
        is_fetching: false,
        failed: false,
        error: '',
        message: '',
        valid_nin: true,
        nins: [],
        nin:'',
        rmNin: ''
    }
};

describe("Async component", () => {

    it("Sagas requestNins", () => {

        const generator = sagas.requestNins();

        let next = generator.next();
        expect(next.value).toEqual(put(actions.getNins()));

        generator.next();
        const resp = generator.next(mockState.config);
        expect(resp.value).toEqual(call(sagas.fetchNins, mockState.config));

        const action = {
          type: actions.GET_NINS_SUCCESS,
          payload: {
            csrf_token: 'csrf-token',
            nins: [{number: '196701100006', verified: false, primary: false},
                   {number: '196701110005', verified: false, primary: false}]
          }
        }
        next = generator.next(action);
        expect(next.value.PUT.action.type).toEqual('NEW_CSRF_TOKEN');
        next = generator.next();
        delete(action.payload.csrf_token);
        expect(next.value).toEqual(put(action));
    });

    it("Sagas requestRemoveNin", () => {

        const generator = sagas.requestRemoveNin(),
              nin = '196701100006';
        mockState.nins.rmNin = nin;
        let next = generator.next(mockState);

        const data = {
            nin: nin,
            csrf_token: 'csrf-token'
        };

        const resp = generator.next(mockState);
        expect(resp.value).toEqual(call(sagas.requestRemove, mockState.config, data));

        const action = {
          type: 'POST_NIN_REMOVE_SUCCESS',
          payload: {
            csrf_token: 'csrf-token',
            message: 'success'
          }
        }
        next = generator.next(action);
        expect(next.value.PUT.action.type).toEqual('NEW_CSRF_TOKEN');
        next = generator.next();
        delete(action.payload.csrf_token);
        expect(next.value).toEqual(put(action));
    });
});
