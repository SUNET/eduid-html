
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import ChangePassword from 'components/ChangePassword';
import * as actions from 'actions/ChangePassword'


const mapStateToProps = (state, props) => {
  let userInput = [];
  userInput.push(state.personal_data.data.given_name);
  userInput.push(state.personal_data.data.surname);
  userInput.push(state.personal_data.data.display_name);
  userInput.concat(state.emails.emails);
  const is_fetching = state.chpass.is_fetching || state.security.is_fetching;
  return {
    is_fetching: is_fetching,
    choose_custom: state.chpass.choose_custom,
    suggested_password: state.chpass.suggested_password,
    new_password: state.chpass.new_password,
    password_entropy: state.config.PASSWORD_ENTROPY,
    password_length: state.config.PASSWORD_LENGTH,
    user_input: userInput,
    next_url: state.chpass.next_url
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleChoice: function (e) {
      if (e.target.checked) {
        dispatch(actions.chooseCustomPassword());
      } else {
        dispatch(actions.chooseSuggestedPassword(props.suggested_password));
      }
    },

    handlePassword: function (password) {
      if (password) {
        dispatch(actions.validCustomPassword(password));
      } else {
        dispatch(actions.passwordNotReady(this.props.l10n('chpass.pw_not_ready')));
      }
    },

    handleStartPasswordChange: function (event) {
      event.preventDefault();
      const oldPassword = document.getElementById('old_password').value;
      if (!oldPassword) {
        dispatch(actions.passwordNotReady(this.props.l10n('chpass.no_old_pw')));
      } else {
        let newPassword = '';
        if (this.props.choose_custom) {
          if (this.props.new_password) {
            newPassword = this.props.new_password;
          } else {
            dispatch(actions.passwordNotReady(this.props.l10n('chpass.pw_not_ready')));
          }
        } else {
          newPassword =  this.props.suggested_password;
        }
        dispatch(actions.postPasswordChange(oldPassword, newPassword));
        this.props.history.push('security');
      }
    },
  }
};

const ChangePasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);

export default ChangePasswordContainer;

