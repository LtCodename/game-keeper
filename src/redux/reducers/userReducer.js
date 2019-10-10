const initState = null;

const USER_CHECK = 'USER_CHECK';

const userReducer = (state = initState, action) => {
  switch(action.type) {
    case USER_CHECK:
      return action.user;
    default:
      return state;
  }
};

export default {reducer: userReducer,  actions: { USER_CHECK }};
