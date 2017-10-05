
import { connect } from 'react-redux';
import Header from 'components/Header';

const mapStateToProps = (state, props) => {
    let email, confirmed;
    if (state.emails.emails.length >= 1) {
        email = state.emails.emails[0].email
    } else {
        email = props.l10n("main.no-email-yet")
    }
    if (state.nins.nins.length >= 1) {
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
  }
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
