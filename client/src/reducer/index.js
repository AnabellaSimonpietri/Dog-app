const initialState = {
  //Almaceno info y se actualiza
  dogs: [],
  allDogs: [],
  temperaments: [],
  detail: {},
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

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
