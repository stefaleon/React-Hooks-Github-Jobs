import React from 'react';
import useFetchJobs from './useFetchJobs';

import { Container } from 'react-bootstrap';
import './App.css';

function App() {
  const { jobs, loading, error } = useFetchJobs();
  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>An error occured!</h1>}
      {jobs.map((job) => (
        <div key={job.id}>{job.title}</div>
      ))}
    </Container>
  );
}

export default App;
