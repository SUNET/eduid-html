
import { connect } from 'react-redux';
import Header from 'components/Header';
import { startLogout } from "actions/Header";
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
    let email, confirmed;
    if (state.emails.emails.length >= 1) {
        email = state.emails.emails[0].email
    } else {
        email = ''
    }
    const nins = state.nins.nins.filter(nin => nin.verified);
    if (nins.length >= 1) {
        confirmed = 'main.confirmed'
    } else {
        confirmed = 'main.unconfirmed'
    }
    return {
        email: email,
        confirmed: confirmed
    }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
      handleLogout: function (e) {
          dispatch(startLogout());
      }
  }
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default i18n(HeaderContainer);
