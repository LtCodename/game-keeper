const initState = null;

const SLI_CHANGE = 'SLI_CHANGE';
const SLI_CHANGE_ON_DELETE = 'SLI_CHANGE_ON_DELETE';

const selectedListIndexReducer = (state = initState, action) => {
  switch(action.type) {
    case SLI_CHANGE:
      if (state !== action.index && action.index >= 0 && action.index < action.listsLength) {
        return action.index;
      }
      return state;
    case SLI_CHANGE_ON_DELETE:
      if (action.listsLength > 1) {
        return 0;
      }
      return null;
    default:
      return state;
  }
};

export default {reducer: selectedListIndexReducer,  actions: { SLI_CHANGE, SLI_CHANGE_ON_DELETE }};
