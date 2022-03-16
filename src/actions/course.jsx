import {
    SAVE_SUCCESS,
    SAVE_FAIL,
    SET_MESSAGE,
    RETRIEVE_FAIL,
  } from "./types";
  import CourseService from "../services/course.service";
  export const save = (name, code, capacity, blockId, facultyId) => (dispatch) => {
    return CourseService.save(name, code, capacity, blockId, facultyId).then(
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
    return CourseService.getAll().then(
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