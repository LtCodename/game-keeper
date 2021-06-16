const initState = [];

const SECTIONS_SET = "SECTIONS_SET";

const userSectionsReducer = (state = initState, action) => {
  switch (action.type) {
    case SECTIONS_SET:
      return action.sections;
    default:
      return state;
  }
};

export default { reducer: userSectionsReducer, actions: { SECTIONS_SET } };
