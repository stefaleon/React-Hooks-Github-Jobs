import React from 'react';
import useFetchJobs from './useFetchJobs';

import { Container } from 'react-bootstrap';
import './App.css';
import Job from './Job';

function App() {
  const { jobs, loading, error } = useFetchJobs();
  return (
    <Container className='my-4'>
      {loading && <h1>Loading...</h1>}
      {error && <h1>An error occured!</h1>}
      {jobs.map((job) => (
        <Job key={job.id} job={job} />
      ))}
    </Container>
  );
}

export default App;
