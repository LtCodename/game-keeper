import lists from '../mocks/lists.js';
import availableDevelopers from '../mocks/developers.js';
import { combineReducers } from 'redux'


const deepCopy = function (objectToCopy) {
  return JSON.parse(JSON.stringify(objectToCopy));
}

const defaultStore = {
  lists: lists,
  developers: availableDevelopers
}

const RENAME = 'RENAME';

const listsReducer = (state = defaultStore.lists, action) => {
  // TODO rewrite download link
  switch(action.type) {
    case RENAME:
      const copy = deepCopy(state);
      if (copy[action.listIndex]) {
        copy[action.listIndex].name = action.name;
        return copy;
      } else {
        return state;
      }
      break;
    default:
      return state;
  }
};

const developersReducer = (state = defaultStore.developers, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  lists: listsReducer,
  developers: developersReducer
});

export default {
  reducer: rootReducer,
  actions: {
    listsActions: {RENAME}
  }
};
