const initState = [];

const SUGGESTED_FETCH = 'SUGGESTED_FETCH';

const suggestedReducer = (state = initState, action) => {
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
    default:
      return state;
  }
};

export default {reducer: suggestedReducer,  actions: { SUGGESTED_FETCH }};
