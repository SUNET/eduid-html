
import { put } from "redux-saga/effects";
import { failRequest } from "actions/common";
import * as actions from "actions/Eidas";

export function* showEidasModal () {
  try {
    yield put(actions.showEidasModalSuccess());
  } catch(error) {
      yield* failRequest(error, actions.showEidasModalFail);
  }
}

export function* closeEidasModal () {
  yield put(actions.hideEidasModalSuccess());
}
