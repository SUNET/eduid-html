
import { connect } from 'react-redux';
import Main from 'components/Main';
import { resizeWindow } from "actions/Config";

const mapStateToProps = (state, props) => {
    return {
        language: state.config.language,
        eppn: state.personal_data.eppn
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

export default MainContainer;
