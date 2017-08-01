
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow, mount, render } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from "expect";
import fetch from "whatwg-fetch";
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import * as actions from "actions/LetterProofing";
import LetterProofingReducer from "reducers/LetterProofing";
import LetterProofing from 'components/LetterProofing'

import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import LetterProofingContainer from "containers/LetterProofing";

const messages = require('../../i18n/l10n/en');
addLocaleData('react-intl/locale-data/en');


describe("Letter proofing Actions", () => {

  it("should create an action to open the modal for the letter-sent code", () => {
    const expectedAction = {
      type: actions.START_LETTER_PROOFING
    };
    expect(actions.startPostLetterProofing()).toEqual(expectedAction);
  });
  it("should create an action to close the modal for the letter-sent code", () => {
    const expectedAction = {
      type: actions.STOP_LETTER_PROOFING
    };
    expect(actions.stopPostLetterProofing()).toEqual(expectedAction);
  });

  it("should create an action to trigger sending a letter with the code", () => {
    const expectedAction = {
      type: actions.POST_LETTER_PROOFING_CODE
    };
    expect(actions.postSendLetterProofing()).toEqual(expectedAction);
  });

  it("should create an action to POST the entered code", () => {
    const data = {code: 'dummy-code'},
          expectedAction = {
              type: actions.POST_LETTER_PROOFING_PROOFING,
              payload: {
                code: data.code
              }
    };
    expect(actions.postLetterProofing(data)).toEqual(expectedAction);
  });

  it("should create an action to wait on sending the code", () => {
    const expectedAction = {
      type: actions.WAIT_LETTER_PROOFING_PROOFING
    };
    expect(actions.waitLetterProofing()).toEqual(expectedAction);
  });

  it("should create an action to signal an error sending the letter", () => {
    const err = new Error('Bad error');
    const expectedAction = {
      type: actions.POST_LETTER_PROOFING_PROOFING_FAIL,
      error: true,
      payload: {
        error: err,
        message: err.toString()
      }
    };
    expect(actions.postLetterProofingFail(err)).toEqual(expectedAction);
  });
  it("should create an action to signal an error verifying the code", () => {
    const err = new Error('Bad error');
    const expectedAction = {
      type: actions.POST_LETTER_PROOFING_CODE_FAIL,
      error: true,
      payload: {
        error: err,
        message: err.toString()
      }
    };
    expect(actions.postLetterCodeFail(err)).toEqual(expectedAction);
  });
});
