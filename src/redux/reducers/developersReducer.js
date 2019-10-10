const initState = [];

const DEVELOPERS_FETCH = 'DEVELOPERS_FETCH';

const developersReducer = (state = initState, action) => {
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
    default:
      return state;
  }
};

export default {reducer: developersReducer,  actions: { DEVELOPERS_FETCH }};
