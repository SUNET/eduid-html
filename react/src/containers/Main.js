
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import Main from 'components/Main';
import { resizeWindow } from "actions/Config";

const mapStateToProps = (state, props) => {
    return {
        window_size: state.config.window_size,
        show_sidebar: state.config.show_sidebar,
        eppn: state.personal_data.data.eppn
    }
};


const mapDispatchToProps = (dispatch, props) => {
    return {
        handleWindowSizeChange (e) {
            dispatch(resizeWindow());
        }
    }
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default i18n(MainContainer);
