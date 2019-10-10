const initState = [];

const PLATFORMS_FETCH = 'PLATFORMS_FETCH';

const platformsReducer = (state = initState, action) => {
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
    default:
      return state;
  }
};

export default {reducer: platformsReducer,  actions: { PLATFORMS_FETCH }};
