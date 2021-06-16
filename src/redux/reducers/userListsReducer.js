const initState = [];

const LISTS_SET = "LISTS_SET";

const userListsReducer = (state = initState, action) => {
  switch (action.type) {
    case LISTS_SET:
      return action.lists;
    default:
      return state;
  }
};

export default { reducer: userListsReducer, actions: { LISTS_SET } };
