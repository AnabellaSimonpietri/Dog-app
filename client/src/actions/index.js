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

export function getTemperaments() {
  return async function (dispatch) {
    var info = await axios.get("http://localhost:3001/temperaments", {});
    return dispatch({ type: "GET_TEMPERAMENTS", payload: info.data });
  };
}

export function postDogs(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/dogs", payload);
    console.log(response);
    return response;
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
