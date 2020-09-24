import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';

import { Container } from 'react-bootstrap';
import './App.css';
import Job from './Job';
import JobsPagination from './JobsPagination';

function App() {
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(null, page);
  return (
    <Container className='my-4'>
      <h1 className='mb-4'>React Jobs</h1>
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>An error occured!</h1>}
      {jobs.map((job) => (
        <Job key={job.id} job={job} />
      ))}
    </Container>
  );
}

export default App;
