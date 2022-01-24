import {UPDATE_IS_FORCE_DARK_MODE} from '../constants/reducerActions';

const INITIAL_STATE = {
  isForceDarkMode: 'default',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_IS_FORCE_DARK_MODE:
      return {
        ...state,
        isForceDarkMode: action.payload,
      };
    default:
      return state;
  }
};
