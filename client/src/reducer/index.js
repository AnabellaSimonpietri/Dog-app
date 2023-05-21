const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };

    case "SEARCH_DOG_SUCCESS":
      return {
        ...state,
        dogs: action.payload,
      };

    case "POST_DOGS":
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default rootReducer;
