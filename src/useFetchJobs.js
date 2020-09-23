import { useReducer, useEffect } from 'react';
import axios from 'axios';

const actions = {
  MAKE_REQUEST: 'make-requestto-github-jobs-api',
  GET_DATA: 'get-data-from-github-jobs-api',
  ERROR: 'error',
};

const { MAKE_REQUEST, GET_DATA, ERROR } = actions;

const BASE_URL =
  'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions';

const initialState = { jobs: [], loading: false };

const reducer = (state, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        jobs: [],
        loading: true,
      };
    case GET_DATA:
      return {
        ...state,
        jobs: action.payload.jobs,
        loading: false,
      };
    case ERROR:
      return {
        ...state,
        jobs: [],
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
};

const getData = async (dispatch, params, page) => {
  console.log('getData called');
  try {
    dispatch({ type: MAKE_REQUEST });
    const res = await axios.get(BASE_URL, {
      params: { ...params, page, markdown: true },
    });
    dispatch({ type: GET_DATA, payload: { jobs: res.data } });
    console.log('got data', res);
  } catch (err) {
    dispatch({ type: ERROR, payload: { error: err } });
  }
};

const useFetchJobs = (params, page) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getData(dispatch, params, page);
  }, [params, page]);

  return state;
};

export default useFetchJobs;
