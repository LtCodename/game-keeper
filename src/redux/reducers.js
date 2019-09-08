import lists from '../mocks/lists.js';
import availableDevelopers from '../mocks/developers.js';
import { combineReducers } from 'redux'


const deepCopy = function (objectToCopy) {
  return JSON.parse(JSON.stringify(objectToCopy));
}

const defaultStore = {
  lists: lists,
  developers: availableDevelopers,
  selectedListIndex: null
}

const LIST_RENAME = 'LIST_RENAME';
const ADD_LIST = 'ADD_LIST';
const ADD_SECTION = 'ADD_SECTION';
const DELETE = 'DELETE';
const CHANGE_POSITION = 'CHANGE_POSITION';

const listsReducer = (state = defaultStore.lists, action) => {
  const copy = deepCopy(state);
  switch(action.type) {
    case LIST_RENAME:
      if (copy[action.listIndex]) {
        copy[action.listIndex].name = action.name;
        return copy;
      } else {
        return state;
      }
      break;
    case ADD_LIST:
      if (!action.listName) {
        return state;
      }else {
        copy.push({
          id: copy.length + 1,
          name: action.listName,
          content: []
        });
        return copy;
      }
      break;
    case DELETE:
      copy.splice(action.index, 1);
      return copy;
      break;
    case ADD_SECTION:
      copy[action.listIndex].content.push({
        id: copy[action.listIndex].content.length + 1,
        name: action.sectionName,
        color: action.sectionColor,
        games: []
      });
      return copy;
      break;
    case CHANGE_POSITION:
      if (action.oldListPosition === action.newListPosition) {
        return copy;
      }

      let spliced = copy.splice(action.oldListPosition, 1);

      copy.splice(action.newListPosition, 0, spliced[0]);

      return copy;
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

const CHANGE_LIST_INDEX = 'CHANGE_LIST_INDEX';
const CHANGE_INDEX_ON_DELETE = 'CHANGE_INDEX_ON_DELETE';

const selectedListIndexReducer = (state = defaultStore.selectedListIndex, action) => {
  switch(action.type) {
    case CHANGE_LIST_INDEX:
      return action.index;
      break;
    case CHANGE_INDEX_ON_DELETE:
      // let newIndex = 0;
      // if (copy.length === 1) {
      //   newIndex = null;
      // }
      console.log('here');
      return null;
      break;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  lists: listsReducer,
  developers: developersReducer,
  selectedListIndex: selectedListIndexReducer
});

export default {
  reducer: rootReducer,
  actions: {
    listsActions: {LIST_RENAME, ADD_LIST, DELETE, CHANGE_POSITION, ADD_SECTION},
    selectedListIndexActions: {CHANGE_LIST_INDEX, CHANGE_INDEX_ON_DELETE}
  }
};
