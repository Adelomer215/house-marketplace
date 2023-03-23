import { SHOW_PASSWORD, UPDATE_EMAIL_PASSWORD } from "../Actions";

const SignUpReducer = (state, action) => {
  switch (action.type) {
    case SHOW_PASSWORD:
      return {
        ...state,
        showPassword: !state.showPassword,
      };
    case UPDATE_EMAIL_PASSWORD:
      return {
        ...state,
        [action.payload.id]: action.payload.value,
      };
    default:
      return state;
  }
};

export default SignUpReducer;
