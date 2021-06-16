const initState = null;

const SLI_CHANGE = "SLI_CHANGE";

const selectedListIndexReducer = (state = initState, action) => {
  switch (action.type) {
    case SLI_CHANGE:
      if (
        state !== action.index &&
        action.index >= 0 &&
        action.index < action.listsLength
      ) {
        return action.index;
      }
      return state;
    default:
      return state;
  }
};

export default { reducer: selectedListIndexReducer, actions: { SLI_CHANGE } };
