
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import zxcvbn from 'zxcvbn';

import ChangePassword from 'components/ChangePassword';
import * as comp from 'components/ChangePassword';
import * as actions from 'actions/ChangePassword';


const pwStrengthMessages = [
    'pwfield.terrible',
    'pwfield.bad',
    'pwfield.weak',
    'pwfield.good',
    'pwfield.strong'
]

const mapStateToProps = (state, props) => {
    let userInput = [];
    userInput.push(state.personal_data.data.given_name);
    userInput.push(state.personal_data.data.surname);
    userInput.push(state.personal_data.data.display_name);
    userInput.concat(state.emails.emails);
    const is_fetching = state.chpass.is_fetching || state.security.is_fetching,
          customPassword = state.form && state.form.chpass && state.form.chpass.values[comp.pwFieldCustomName] || '',
          result = zxcvbn(customPassword, userInput),
          entropy = Math.log(result.guesses, 2);
    let score = 0,
        configEntropy = state.config.PASSWORD_ENTROPY,
        minEntropy = configEntropy / 5,
        stepEntropy = minEntropy;
    for (let n=0; n < 5 && entropy > minEntropy; n++){
        score = n;
        minEntropy += stepEntropy;
    }

    return {
        is_fetching: is_fetching,
        suggested_password: state.chpass.suggested_password,
        choose_custom: state.chpass.choose_custom,
        next_url: state.chpass.next_url,
        password_entropy: configEntropy,
        password_score: score,
        password_strength_msg: pwStrengthMessages[score],
        custom_ready: configEntropy > entropy
    }
};


const mapDispatchToProps = (dispatch, props) => {
    return {
        handleChoice: function (value) {
          if (value === 'custom') {
            dispatch(actions.chooseCustomPassword());
          } else {
            dispatch(actions.chooseSuggestedPassword(props.suggested_password));
          }
        },

        handleStartPasswordChange: function (event) {
            event.preventDefault();
            const oldPassword = this.refs[comp.pwFieldOldName].value;
            let newPassword = this.props.suggested_password;
            if (this.props.choose_custom) {
                newPassword = this.refs[comp.pwFieldCustomName].value;
            }
            dispatch(actions.postPasswordChange(oldPassword, newPassword));
        },
    }
};

const ChangePasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);

export default ChangePasswordContainer;

