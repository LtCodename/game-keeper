const initState = [];

const BLOCKS_SET = "BLOCKS_SET";

const userBlocksReducer = (state = initState, action) => {
	switch (action.type) {
		case BLOCKS_SET:
			return action.blocks;
		default:
			return state;
	}
};

export default { reducer: userBlocksReducer, actions: { BLOCKS_SET } };
