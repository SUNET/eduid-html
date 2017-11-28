
import * as actions from "actions/Config";

// see the config params in eduid-developer/etcd/conf.yaml
const configData = {
    window_size: actions.getWindowSize(),
    show_sidebar: true,
    is_configured: false,
    is_fetching: false,
    failed: false,
    is_spa: false
};

const urls_with_no_sidebar = [
    'chpass'
];


let configReducer = (state=configData, action) => {
  switch (action.type) {
    case actions.GET_JSCONFIG_CONFIG:
      return {
          ...state, 
          is_configured: false,
          is_fetching: true,
          failed: false
      };
    case actions.GET_JSCONFIG_CONFIG_SUCCESS:
      return {
          ...state, 
          ...action.payload,
          is_configured: true,
          is_fetching: false,
          failed: false
      };
    case actions.GET_JSCONFIG_CONFIG_FAIL:
      return {
          ...state,
          is_configured: false,
          is_fetching: false,
          failed: true
      };
    case actions.NEW_CSRF_TOKEN:
      return {
          ...state,
          ...action.payload
      };
    case actions.SET_LANGUAGE:
      return {
          ...state,
          ...action.payload
      };
    case actions.RESIZE_WINDOW:
      return {
          ...state,
          ...action.payload
      };
    case actions.CONFIG_SPA:
      return {
          ...state,
          is_spa: true
      };
    case "@@router/LOCATION_CHANGE":
      let show_sidebar = true;
      if (urls_with_no_sidebar.filter(v => (action.payload.pathname.endsWith(v))).length > 0) {show_sidebar = false}
      return {
          ...state,
          show_sidebar: show_sidebar
      };
    default:
      return state;
  }
};

export default configReducer;
