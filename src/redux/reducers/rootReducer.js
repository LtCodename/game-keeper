import colorsReducer from "./colorsReducer";
import userListsReducer from "./userListsReducer";
import userSectionsReducer from "./userSectionsReducer";
import userBlocksReducer from "./userBlocksReducer";
import platformsReducer from "./platformsReducer";
import userReducer from "./userReducer";
import selectedListIndexReducer from "./selectedListIndexReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	colors: colorsReducer.reducer,
	userData: userReducer.reducer,
	selectedListIndex: selectedListIndexReducer.reducer,
	platforms: platformsReducer.reducer,
	userLists: userListsReducer.reducer,
	userSections: userSectionsReducer.reducer,
	userBlocks: userBlocksReducer.reducer,
});

export default rootReducer;
