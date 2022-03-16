import {
    SAVE_SUCCESS,
    SAVE_FAIL,
    SET_MESSAGE,
    RETRIEVE_FAIL,
  } from "./types";
  import BlockService from "../services/block.service";
  export const save = (name, startDate, endDate) => (dispatch) => {
    return BlockService.save(name, startDate, endDate).then(
      (response) => {
        dispatch({
          type: SAVE_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SAVE_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };
  export const getAll = () => (dispatch) => {
    return BlockService.getAll().then(
      (data) => {
        dispatch({
          payload: { data: data },
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: RETRIEVE_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };