import { useReducer } from 'react';

const initialState = { jobs: [], loading: true };

const reducer = (state, action) => {
  switch (action.type) {
    case 'MAKE_REQUEST':
      return {
        jobs: [],
        loading: true,
      };
    case 'GET_DATA':
      return {
        ...state,
        jobs: action.payload.jobs,
        loading: false,
      };
    case 'ERROR':
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

const useFetchJobs = (params, page, jobs) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { jobs: initialState.jobs, loading: true, error: true };
};

export default useFetchJobs;
