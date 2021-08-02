import { connect } from "react-redux";
import { signup } from "../../actions/session_actions";
import SessionForm from "./sessionForm";

const mSTP = (state, ownProps) => ({
    errors: state.errors,
    formType: 'signup'
});

const mDTP = (dispatch, ownProps) => ({
    processForm: (user) => dispatch(signup(user))
})

export default connect(mSTP, mDTP)(SessionForm);