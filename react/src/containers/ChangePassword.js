
import { connect } from 'react-redux';
import ChangePassword from 'components/ChangePassword';
import * as actions from 'actions/ChangePassword'


const mapStateToProps = (state, props) => {
  let userInput = [];
  userInput.add(state.personal_data.given_name);
  userInput.add(state.personal_data.surname);
  userInput.add(state.personal_data.display_name);
  userInput.concat(state.emails.emails);
  return {
    is_fetching: state.chpass.is_fetching,
    choose_custom: state.chpass.choose_custom,
    suggested_password: state.chpass.suggested_password,
    password_entropy: state.config.PASSWORD_ENTROPY,
    password_length: state.config.PASSWORD_LENGTH,
    user_input: userInput,
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleChoice: function (e) {
      if (e.target.checked) {
        dispatch(actions.chooseCustomPassword());
      } else {
        dispatch(actions.chooseSuggestedPassword());
      }
    },

    validateCustomPass: function () {},
    validateSuggestedPass: function () {},

    get_input: function (name) {
        // return an input container from jQuery
        return pwdialog.find("input[name=" + name + "]");
    },

    get_password: function (name) {
        // remove spaces from passwords, just like vccs-client does
        const passwd = get_input(name).val();
        if (passwd !== undefined) {
            return passwd.split(' ').join('');
        } else {
            return '';
        }
    },

    checkCustomPassword: function () {
      const pwdialog = document.querySelector("#changePasswordDialog"),
            custom_password = get_password('custom_password'),
            repeated_password = get_password('repeated_password'),
            suggested_password = $('.suggested-password').html().split(' ').join(''),
            messages = [],
            password_field = get_input("custom_password"),
            verdict = zxcvbn(custom_password, ["eduid"].concat(props.user_input));

      password_field.val(custom_password);  // properly remove spaces for pwcheck

      if (custom_password !== suggested_password &&
            (verdict.entropy < props.password_entropy)) {
          messages.push(props.l10n('chpass.msg_stronger'));
      }
      //error_messages(repeated_password_field, messages);
      checkRepeatedPassword();
    },

    checkRepeatedPassword: function () {
      const pwdialog = document.querySelector("#changePasswordDialog"),
            custom_password = get_password('custom_password'),
            repeated_password = get_password('repeated_password'),
            messages = [],
            repeated_password_field = get_input("repeated_password");

      repeated_password_field.val(repeated_password);  // properly remove spaces for pwcheck

      if (repeated_password != custom_password) {
          messages.push(props.l10n('chpass.msg_again'));
      }
      pwequality_errors = messages.length;
      //error_messages(repeated_password_field, messages);
    },
  }
};

const ChangePasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);

export default ChangePasswordContainer;

