
import { connect } from 'react-redux';
import Emails from 'components/Emails';
import { addEmail, changeEmail } from "actions/Emails";


const mapStateToProps = (state, props) => {
  return {
    emails: state.emails.emails
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleAdd: (e) => {
      dispatch(addEmail());
    },
    handleChange: function (e) {
      let data = {
        email: e.target.value
      };
      dispatch(changeEmail(data));
    }
  }
};

const EmailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Emails);

export default EmailsContainer;

