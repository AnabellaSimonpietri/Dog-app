import axios from "axios";

export function getAllDogs() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/dogs");
      dispatch({ type: "GET_DOGS", payload: response.data });
    } catch (error) {
      // Hago un manejo de errores
      console.error(error);
    }
  };
}

export const searchDog = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      dispatch({ type: "SEARCH_DOG_SUCCESS", payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};
