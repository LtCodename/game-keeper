const initState = [];

const COLORS_FETCH = "COLORS_FETCH";

const colorsReducer = (state = initState, action) => {
  const copy = [];
  switch (action.type) {
    case COLORS_FETCH:
      action.snapshot.forEach((doc) => {
        let otherData = doc.data();
        copy.push({
          id: doc.id,
          ...otherData,
        });
      });
      return copy;
    default:
      return state;
  }
};

export default { reducer: colorsReducer, actions: { COLORS_FETCH } };
