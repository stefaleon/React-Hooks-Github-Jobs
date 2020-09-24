import { useReducer, useEffect } from 'react';
import axios from 'axios';

const actions = {
  MAKE_REQUEST: 'make-requestto-github-jobs-api',
  GET_DATA: 'get-data-from-github-jobs-api',
  ERROR: 'error',
  UPDATE_HAS_NEXT_PAGE: 'update-has-next-page',
};
const { MAKE_REQUEST, GET_DATA, ERROR, UPDATE_HAS_NEXT_PAGE } = actions;

const BASE_URL =
  'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

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
    case UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage };
    default:
      return state;
  }
};

const getData = async (dispatch, params, page) => {
  console.log('getData called');
  // handle throttling
  const cancelToken1 = axios.CancelToken.source();
  const cancelToken2 = axios.CancelToken.source();
  try {
    dispatch({ type: MAKE_REQUEST });
    const res = await axios.get(BASE_URL, {
      cancelToken: cancelToken1.token,
      params: { ...params, page, markdown: true },
    });
    dispatch({ type: GET_DATA, payload: { jobs: res.data } });
    console.log('got data', res);

    const res2 = await axios.get(BASE_URL, {
      cancelToken: cancelToken2.token,
      params: { ...params, page: page + 1, markdown: true },
    });
    dispatch({
      type: UPDATE_HAS_NEXT_PAGE,
      payload: { hasNextPage: res2.data.length !== 0 },
    });
  } catch (err) {
    if (axios.isCancel(err)) return;
    dispatch({ type: ERROR, payload: { error: err } });
  }
  return () => {
    cancelToken1.cancel();
    cancelToken2.cancel();
  };
};

const useFetchJobs = (params, page) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getData(dispatch, params, page);
  }, [params, page]);

  return state;
};

export default useFetchJobs;
