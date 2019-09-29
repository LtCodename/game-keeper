import lists from '../mocks/lists.js';
import { combineReducers } from 'redux';

const deepCopy = function (objectToCopy) {
  return JSON.parse(JSON.stringify(objectToCopy));
}

const defaultStore = {
  lists: lists,
  userLists: [],
  userSections: [],
  userBlocks: [],
  developers: [],
  suggestedDevelopers: [],
  platforms: [],
  selectedListIndex: null,
  userData: null
}

const BLOCK_DELETE = 'BLOCK_DELETE';
const BLOCK_SAVE = 'BLOCK_SAVE';
const BLOCK_ADD = 'BLOCK_ADD';

const listsReducer = (state = defaultStore.lists, action) => {
  const copy = deepCopy(state);
  let spliced;
  let uniqueIndex = 0;

  switch(action.type) {
    case BLOCK_DELETE:
      copy[action.listIndex].content[action.sectionIndex].games.splice(action.blockIndex, 1);
      return copy;
      break;
    case BLOCK_SAVE:
      copy[action.listIndex].content[action.sectionIndex].games[action.blockIndex] = action.saveData;
      if (action.listIndex !== action.newListIndex || action.sectionIndex !== action.newSectionIndex) {
        if (!copy[action.newListIndex].content.length) {
          uniqueIndex = `id${new Date().getTime()}`;
          copy[action.newListIndex].content.push({
            color: "madang",
            games: [],
            id: uniqueIndex,
            name: "New Section"
          })
        }
        copy[action.newListIndex].content[action.newSectionIndex].games.push(copy[action.listIndex].content[action.sectionIndex].games[action.blockIndex]);
        copy[action.listIndex].content[action.sectionIndex].games.splice(action.blockIndex, 1);
      }
      return copy;
      break;
    case BLOCK_ADD:
      uniqueIndex = `id${new Date().getTime()}`;
      copy[action.listIndex].content[action.sectionIndex].games.push({
        id: `${uniqueIndex}`,
        ...action.saveData
      });
      return copy;
      break;
    default:
      return state;
  }
};

const DEVELOPERS_FETCH = 'DEVELOPERS_FETCH';

const developersReducer = (state = defaultStore.developers, action) => {
  const copy = [];
  switch(action.type) {
    case DEVELOPERS_FETCH:
      action.snapshot.forEach(doc => {
        let otherData = doc.data();
        copy.push({
          id: doc.id,
          ...otherData
        });
      });
      return copy;
      break;
    default:
      return state;
  }
};

const SUGGESTED_FETCH = 'SUGGESTED_FETCH';

const suggestedReducer = (state = defaultStore.suggestedDevelopers, action) => {
  const copy = [];
  switch(action.type) {
    case SUGGESTED_FETCH:
      action.snapshot.forEach(doc => {
        let otherData = doc.data();
        copy.push({
          id: doc.id,
          ...otherData
        });
      });
      return copy;
      break;
    default:
      return state;
  }
};

//****************

const LISTS_SET = 'LISTS_SET';

const userListsReducer = (state = defaultStore.userLists, action) => {
  switch(action.type) {
    case LISTS_SET:
      return action.lists;
      break;
    default:
      return state;
  }
};

const SECTIONS_SET = 'SECTIONS_SET';

const userSectionsReducer = (state = defaultStore.userSections, action) => {
  switch(action.type) {
    case SECTIONS_SET:
      return action.sections;
      break;
    default:
      return state;
  }
};

const BLOCKS_SET = 'BLOCKS_SET';

const userBlocksReducer = (state = defaultStore.userBlocks, action) => {
  switch(action.type) {
    case BLOCKS_SET:
      return action.blocks;
      break;
    default:
      return state;
  }
};

//****************

const PLATFORMS_FETCH = 'PLATFORMS_FETCH';

const platformsReducer = (state = defaultStore.platforms, action) => {
  const copy = [];
  switch(action.type) {
    case PLATFORMS_FETCH:
      action.snapshot.forEach(doc => {
        let data = doc.data();
        copy.push({
          ...data
        });
      });
      return copy;
      break;
    default:
      return state;
  }
};

const USER_CHECK = 'USER_CHECK';

const userReducer = (state = defaultStore.userData, action) => {
  switch(action.type) {
    case USER_CHECK:
      return action.user;
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
      if (state !== action.index && action.index >= 0 && action.index < action.listsLength) {
        return action.index;
      }
      return state;
      break;
    case SLI_CHANGE_ON_DELETE:
      if (action.listsLength > 1) {
        return 0;
      }
      return null;
      break;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  lists: listsReducer,
  userLists: userListsReducer,
  userSections: userSectionsReducer,
  userBlocks: userBlocksReducer,
  developers: developersReducer,
  suggestedDevelopers: suggestedReducer,
  platforms: platformsReducer,
  selectedListIndex: selectedListIndexReducer,
  userData: userReducer
});

export default {
  reducer: rootReducer,
  actions: {
    listsActions: {
      BLOCK_DELETE,
      BLOCK_SAVE,
      BLOCK_ADD
    },
    developersActions: {
      DEVELOPERS_FETCH
    },
    suggestedActions: {
      SUGGESTED_FETCH
    },
    platformsActions: {
      PLATFORMS_FETCH
    },
    selectedListIndexActions: {
      SLI_CHANGE,
      SLI_CHANGE_ON_DELETE
    },
    userListsActions: {
      LISTS_SET
    },
    userSectionsActions: {
      SECTIONS_SET
    },
    userBlocksActions: {
      BLOCKS_SET
    },
    userActions: {
      USER_CHECK
    }
  }
};
