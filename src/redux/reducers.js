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
const LIST_ADD = 'LIST_ADD';
const LIST_ADD_SECTION = 'LIST_ADD_SECTION';
const LIST_DELETE = 'LIST_DELETE';
const LIST_CHANGE_POSITION = 'LIST_CHANGE_POSITION';
const BLOCK_DELETE = 'LOCK_DELETE';
const BLOCK_CHANGE_GAME_SECTION = 'BLOCK_CHANGE_GAME_SECTION';
const BLOCK_SAVE = 'BLOCK_SAVE';

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
    case LIST_ADD:
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
    case LIST_DELETE:
      copy.splice(action.index, 1);
      return copy;
      break;
    case LIST_ADD_SECTION:
      copy[action.listIndex].content.push({
        id: copy[action.listIndex].content.length + 1,
        name: action.sectionName,
        color: action.sectionColor,
        games: []
      });
      return copy;
      break;
    case LIST_CHANGE_POSITION:
      if (action.oldListPosition === action.newListPosition) {
        return copy;
      }
      let spliced = copy.splice(action.oldListPosition, 1);
      copy.splice(action.newListPosition, 0, spliced[0]);
      return copy;
      break;
    case BLOCK_DELETE:
      copy[action.listIndex].content[action.sectionIndex].games.splice(action.blockIndex, 1);
      return copy;
      break;
    case BLOCK_CHANGE_GAME_SECTION:
      copy[action.listIndex].content[action.newSectionIndex].games.push(copy[action.listIndex].content[action.sectionIndex].games[action.blockIndex]);
      copy[action.listIndex].content[action.sectionIndex].games.splice(action.blockIndex, 1);
      return copy;
      break;
    case BLOCK_SAVE:
    console.log(action)
      copy[action.listIndex].content[action.sectionIndex].games[action.blockIndex] = action.saveData;
      return copy;
      break;
    default:
      return state;
  }
};

const DEVELOPER_ADD = 'DEVELOPER_ADD';

const developersReducer = (state = defaultStore.developers, action) => {
  const copy = deepCopy(state);
  switch(action.type) {
    case DEVELOPER_ADD:
      const uniqueIndex = `id${new Date().getTime()}`;
      copy.push({
        id: uniqueIndex,
        name: action.newDeveloper
      })
      return copy;
      break;
    default:
      return state;
  }
};

const SLI_CHANGE = 'SLI_CHANGE';
const SLI_CHANGE_ON_DELETE = 'SLI_CHANGE_ON_DELETE';

const selectedListIndexReducer = (state = defaultStore.selectedListIndex, action) => {
  switch(action.type) {
    case SLI_CHANGE:
      return action.index;
      break;
    case SLI_CHANGE_ON_DELETE:
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
    listsActions: {LIST_RENAME, LIST_ADD, LIST_DELETE, LIST_CHANGE_POSITION, LIST_ADD_SECTION, BLOCK_DELETE, BLOCK_CHANGE_GAME_SECTION, BLOCK_SAVE},
    developersActions: {DEVELOPER_ADD},
    selectedListIndexActions: {SLI_CHANGE, SLI_CHANGE_ON_DELETE}
  }
};
