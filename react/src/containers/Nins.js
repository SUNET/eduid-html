
import { connect } from 'react-redux';
import Nins from 'components/Nins';
import * as actions from "actions/Nins";


function valid_nin(value) {
  // taken from https://gist.github.com/DiegoSalazar/4075533/
  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) return false;
	// The Luhn Algorithm. It's so pretty.
	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);
		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}
		nCheck += nDigit;
		bEven = !bEven;
	}
	return (nCheck % 10) == 0;
}

const mapStateToProps = (state, props) => {
  return {
     nins: state.nins.nins,
     proofing_methods: state.config.PROOFING_METHODS,
     valid_nin: state.nins.valid_nin,
     is_fetching: state.nins.is_fetching,
     message: state.nins.message
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
      validateNin: function (value) {
          if (valid_nin(value)) {
              return 'success';
          } else {
              return 'error';
          }
      },
      handleChange: function (e) {
          const value = e.target.value;
          if (valid_nin(value)) {
              dispatch(actions.validNin(value));
          } else {
              dispatch(actions.invalidNin());
          }
      },
      handleDelete: function (e) {
      }
  }
};

const NinsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nins);

export default NinsContainer;
